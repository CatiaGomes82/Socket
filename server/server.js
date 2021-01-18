require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

// config
const app = express();

// public folder
app.use(express.static(path.join(__dirname, 'public')))

// configuring express to use body-parser as middle-ware - required to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session
let sess = {
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 30
    },
    name: 'PokerSessionID',
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuidv4(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Error handlers
// 404 page handled by client app
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/*
 * Create HTTP server.
 */
const server = http.createServer(app);

/* socket connection */
app.io = require('socket.io')();
app.io.attach(server);

// load passport - authentication
const PassportConfigured = require('./passport')(passport);

// routes
const routes = require('./routes/index');
const userRoute = require('./routes/userRoute')(PassportConfigured);
const socketRoute = require('./routes/socketRoute')(app.io);

app.use('/', routes);
app.use('/api/user', userRoute);
app.use('/socket', socketRoute);


/* database connection */
const models = require('./models');

//models.sequelize.sync({ force: true })
models.sequelize.sync().then(function () {
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