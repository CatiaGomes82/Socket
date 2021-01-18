//const CacheService = require('./cacheService');
const Sequelize = require('sequelize');
//const ttl = 24 * 60 * 60 * 1; // cache for 24 Hour

const Op = Sequelize.Op;
const models = require('../models');
const logMessages = require('../settings/logMessages');


//const cache = new CacheService(ttl); // Create a new cache service instance

module.exports = {
    find(email, isRequestEmpty) {
        // find user
        if (!isRequestEmpty && typeof email !== 'undefined') {
            return this.getUser(email);
        }

        // find all
        return this.getAll();
    },
    getAll() {
        return models.User.findAll({
            attributes: ['Name', 'Email']
        }).then((result) => {
            return JSON.stringify(result);
        });
    },
    getUser(email) {
        return models.User.findOne({
            where: { Email: email },
            attributes: ['Name', 'Email']
        }).then((result) => {
            const isValidModel = result instanceof models.User; 

            if (!result) {
                return Promise.resolve(null);
            }

            if (!isValidModel) {
                return Promise.reject(logMessages.INVALID_MODEL_ERROR + models.User.name);
            }

            return Promise.resolve(JSON.stringify(result));
        });
    },
    createUser(userData) {
        // create instance
        // const jane = User.build({ name: "Jane" });
        // console.log(jane instanceof User); // true
        // console.log(jane.name); // "Jane"


        console.log(userData)
        return models.User.create({
            where: { Email: userData.Email },
            attributes: ['Id', 'Name', 'Email'],
            defaults: {
                Id: '81bc7ce-7522-46a7-9c0f-d11fa58add00',
                Name: 'Came',
                Email: 'boom@gmail.com'
            }
        }).then((response) => {
            const result = response[0];
            const created = result.isNewRecord;
            console.log(result)
            if (created) {
                console.log('Created user with user Id ' + user.Id)
            }

            return created;
        }).catch(error => {
            console.log('Error creating user:' + error)
            return error;
        });
    },
    updateUser() {

    },
    deleteUser() {

    }
    // getCustomer(CustomerId) {
    //     const key = 'getCustomers-' + CustomerId;

    //     // return cache.get(key, () => models.Customer.findAll({
    //     //     attributes: ['CustomerId', 'CustomerName', 'CustomerUrl']
    //     // })).then((result) => {
    //     //     return result;
    //     // })

    //     return models.Customer.findOne({
    //         where: { CustomerId: CustomerId },
    //         attributes: ['CustomerId', 'CustomerName', 'CustomerUrl'],
    //         include: [
    //             {
    //                 model: models.Page,
    //                 attributes: ['PageId', 'PageName', 'PageUrl'],
    //                 include: [
    //                     {
    //                         order: [['createdAt', 'DESC']],
    //                         limit: 30,
    //                         model: models.Report,
    //                         attributes: ['ReportId', 'ReportPerformanceScore', 'ReportContentPaintValue', 'ReportContentPaintScore', 'ReportSpeedIndexValue', 'ReportSpeedIndexScore', 'ReportTimeInteractiveValue', 'ReportTimeInteractiveScore', 'ReportScreenshots', 'createdAt']
    //                     }]
    //             }]
    //     }).then((result) => {
    //         return result;
    //     })
    // }



    // getAllCustomers() {
    //     const key = 'getAllCustomers';
    //     var startDate = new Date();
    //     startDate.setMonth(startDate.getMonth() - 1); // a month before

    //     return cache.get(key, () => models.Customer.findAll({
    //         attributes: ['CustomerId', 'CustomerName', 'CustomerUrl'],
    //         include: [
    //             {
    //                 model: models.Page,
    //                 attributes: ['PageId', 'PageName', 'PageUrl'],
    //                 include: [{
    //                     model: models.Report,
    //                     attributes: ['ReportId', 'ReportScore', 'ReportPerformance', 'ReportAccessibility', 'ReportBestPractise', 'ReportSeo', 'ReportPwa', 'ReportFirstContent', 'ReportSpeedIndex', 'ReportInteractive', 'ReportScreenshots', 'createdAt'],
    //                     where: {
    //                         createdAt: {
    //                             [Op.gte]: startDate
    //                         }
    //                     },
    //                 }]
    //             }
    //         ]
    //     })).then((result) => {
    //         console.log(result)
    //         return result;
    //     })
    // },

    // getFeedById(feedID) {
    //   const selectQuery = `SELECT * FROM feeds WHERE feedID = ${feedID}`;
    //   const key = `getFeedById_${feedID}`;

    //   return cache.get(key, () => DB.then((connection) =>
    //     connection.query(selectQuery).then((rows) => {
    //       return rows[0];
    //     })
    //   )).then((result) => {
    //     return result;
    //   });
    // },

    // countFeeds(userID) {
    //   const selectQuery = `SELECT COUNT(*) as count FROM feeds WHERE userID = ${userID}`;
    //   const key = `countFeeds_${userID}`;

    //   return cache.get(key, () => DB.then((connection) =>
    //     connection.query(selectQuery).then((rows) => {
    //       return rows[0].count;
    //     })
    //   )).then((result) => {
    //     return result;
    //   });
    // },

    // update(userID, feedID, feedData) {
    //   const whereQuery = `WHERE feedID = ${feedID} AND userID = ${userID}`;
    //   const updateQuery = `UPDATE feeds SET ? ${whereQuery}`;

    //   return DB.then((connection) => connection.query(updateQuery, feedData).then(() => {
    //     cache.del([`getFeedById_${feedID}`, `getUserFeeds_${userID}`]);
    //     return true;
    //   }));
    // },

    // delete(userID, feedID) {
    //   const deleteQuery = `DELETE from feeds WHERE userID = ${userID} AND feedID = ${feedID}`;
    //   return DB.then((connection) => connection.query(updateQuery, params).then(() => {
    //     cache.del([`countFeeds_${userID}`, `getFeedById_${feedID}`, `getUserFeeds_${userID}`]);
    //     return true;
    //   }));
    // }
};
