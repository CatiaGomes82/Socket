require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const lighthouseBatch = require('lighthouse-batch');
const session = require('express-session');
const http = require('http');
const fs = require('fs');

const models = require('./models');

const logMessage = require('./helpers/log-messages');

// config
const app = express();

// let sess = {
//     secret: process.env.SESSION_SECRET,
//     cookie: {}
// }

// if (process.env.NODE_ENV === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
// }
// app.use(session(sess));

// configuring express to use body-parser as middle-ware - required to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule('*/10 * * * *', () => { // every day at 9pm - cron syntax - https://crontab.guru/
    const d = new Date();
    const reportTodayFolder = path.join(__dirname, './data/' + d.getDate() + '_' + (d.getMonth() + 1) + '_' + d.getFullYear() + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds())
    const lighthouseOpts = {
        sites: [],
        out: reportTodayFolder
    };
    const pageData = [];

    // look for page urls and ids
    models.Page.findAll({
        attributes: ['PageId', 'PageUrl']
    }).then(function (pages) {
        
        console.log(pages)
        pages.forEach(currentPage => {
            lighthouseOpts.sites.push(currentPage.PageUrl);
            pageData.push({
                PageUrl: currentPage.PageUrl,
                PagePageId: currentPage.PageId,
            });
        });

        logMessage.inform('Running lighthouse reports for ' + lighthouseOpts.sites.join(','));

        lighthouseBatch(lighthouseOpts);

        pageData.forEach((currentPage, i) => {
            const url = currentPage.PageUrl;
            const reportName = url.replace('https://', '').replace(/([./])/g, '_') + '.report.json';
            const fullReportPath = fs.readFileSync(reportTodayFolder + '/' + reportName); // get report from folder
            const reportFull = JSON.parse(fullReportPath);
            const performanceScore = reportFull.categories.performance.score;
            const accessibilityScore = reportFull.categories.accessibility.score;
            const bestPractiseScore = reportFull.categories['best-practices'].score;
            const seoScore = reportFull.categories.seo.score;
            const pwaScore = reportFull.categories.pwa.score;
            const overallScore = (performanceScore + accessibilityScore + bestPractiseScore + seoScore + pwaScore) / 5;
        
            pageData[i].ReportOverallScore = overallScore.toFixed(2).toString();
            pageData[i].ReportPerformanceScore = performanceScore.toString();
            pageData[i].ReportAccessibilityScore = accessibilityScore.toString();
            pageData[i].ReportBestPractiseScore = bestPractiseScore.toString();
            pageData[i].ReportSeoScore = seoScore.toString();
            pageData[i].ReportPwaScore = pwaScore.toString();
            pageData[i].ReportContentPaintValue = reportFull.audits['first-contentful-paint'].displayValue.toString();
            pageData[i].ReportContentPaintScore = reportFull.audits['first-contentful-paint'].score.toString();
            pageData[i].ReportSpeedIndexValue = reportFull.audits['speed-index'].displayValue.toString();
            pageData[i].ReportSpeedIndexScore = reportFull.audits['speed-index'].score.toString();
            pageData[i].ReportTimeInteractiveValue = reportFull.audits['interactive'].displayValue.toString();
            pageData[i].ReportTimeInteractiveScore = reportFull.audits['interactive'].score.toString();
            pageData[i].ReportAudits = JSON.stringify(reportFull.audits);
            pageData[i].ReportScreenshots = JSON.stringify(reportFull.audits['screenshot-thumbnails'].details.items);
            pageData[i].ReportFinalScreenshot = JSON.stringify(reportFull.audits['final-screenshot'].details);
            pageData[i].ReportLighthouseVersion = reportFull.lighthouseVersion.toString();

            delete pageData[i].PageUrl;
        });

        models.Report.bulkCreate(pageData)
            .then(function () {
                logMessage.success('Reports successfully stored in database - ' + lighthouseOpts.sites.join(','))
                // remove report folder
                fs.unlink(reportTodayFolder, (err) => {
                    if (err) {
                        logMessage.error('Could not remove reports directory in ' + reportTodayFolder);
                        return;
                    }
                })
            }).catch(function (err) {
                logMessage.error(err)
            });
    });
}, {
    scheduled: true
});


// Routes



// Error handlers
// 404 page handled by client app
const port = normalizePort('8000');
app.set('port', port);

/*
 * Create HTTP server.
 */
const server = http.createServer(app);

models.sequelize.sync().then(function () {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function () {
        console.log('\x1b[32m', `Listening on port ${server.address().port}`, '\x1b[0m')
    });
    server.on('error', onError);
    server.on('listening', onListening);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
           // process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            server.close()
           // process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    console.log('\x1b[32m', `Listening on ${bind}`, '\x1b[0m')
}


const killConnections = () => {
    server.close();
}

 process.on('SIGINT', () => {
     killConnections();
 });
 process.on('uncaughtException', () => {
     killConnections();
 });
 process.on('SIGTERM', () => {
     killConnections();
 });