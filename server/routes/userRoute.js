const express = require('express');
const router = express.Router();
//const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const userService = require('../services/userService');
const {
    HTTP_OK,
    HTTP_SERVER_ERROR,
    HTTP_BAD_REQUEST,
    REGEX_EMAIL,
    USER_EXISTS
} = require('../settings');


/*
* Authenticate user
*/
module.exports = function (passport) {

    router.post('/authenticate', function (req, res, next) {
        console.log(req.isAuthenticated())
        console.log(req.body)
        //console.log(req)
        passport.authenticate('local', function (err, userIsValid, info) {
            if (err) {
                console.log('error in authenticate');
                return res.status(500).send();
            }

            return res.status(200).send({ Authenticated: userIsValid });
        })(req, res, next);
    });

    router.post('/login', function (req, res, next) {
       // console.log(req)
        console.log(req.user)
        console.log(req.User)
        console.log(req.Id)
        console.log(req.session)
        console.log(req.session.cookie)
        console.log(req.isAuthenticated())
        //console.log(req.cookie['PokerSessionID'])
        //console.log(req.body)
        //console.log(req)
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.log('error in authenticate');
                return next(err);
            }

            // if (!user) {
            //     console.log('logged out');
            //     return res.status(200).send({ Authenticated: false });
            // }

            return res.status(200).send({ Authenticated: user });
        })(req, res, next);
    });



    // router.post('/authenticate', (req, res) => {
    //     console.log(req.session)


    //     const requestBody = req.body,
    //         isRequestEmpty = !Object.keys(requestBody).length,
    //         emailIsValid = typeof requestBody.Email !== 'undefined' && requestBody.Email !== '' && REGEX_EMAIL.test(requestBody.Email);

    //     if (emailIsValid || isRequestEmpty) {
    //         userService.find(requestBody.Email, isRequestEmpty).then(result => {
    //             res.status(HTTP_OK).send(result);
    //             passport.authenticate('local', (err, user, info) => {
    //                 console.log('Inside passport.authenticate() callback');
    //                 console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    //                 console.log(`req.user: ${JSON.stringify(req.user)}`)
    //                 req.login(user, (err) => {
    //                     console.log('Inside req.login() callback')
    //                     console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    //                     console.log(`req.user: ${JSON.stringify(req.user)}`)
    //                     return res.send('You were authenticated & logged in!\n');
    //                 })
    //             })(req, res, next);
    //         }).catch(error => {
    //             console.log('Error finding user - ' + error);
    //             res.status(HTTP_SERVER_ERROR).send();
    //         });

    // } else {
    //     console.log('Request not valid');
    //     res.status(HTTP_BAD_REQUEST).send();
    // }
    // });

    /*
    * Get all or specific user
    */
    router.get('/find', (req, res) => {
        const requestBody = req.body,
            isRequestEmpty = !Object.keys(requestBody).length,
            emailIsValid = typeof requestBody.Email !== 'undefined' && requestBody.Email !== '' && REGEX_EMAIL.test(requestBody.Email);

        if (emailIsValid || isRequestEmpty) {
            userService.find(requestBody.Email, isRequestEmpty).then(result => {
                res.status(HTTP_OK).send(result);
            }).catch(error => {
                console.log('Error finding user - ' + error);
                res.status(HTTP_SERVER_ERROR).send();
            });

        } else {
            console.log('Request not valid');
            res.status(HTTP_BAD_REQUEST).send();
        }
    });

    /*
    * Create new user
    */
    router.post('/create', (req, res) => {
        const requestBody = req.body,
            nameIsValid = typeof requestBody.Name !== 'undefined' && requestBody.Name !== '',
            emailIsValid = typeof requestBody.Email !== 'undefined' && requestBody.Email !== '';

        if (nameIsValid && emailIsValid) {
            userService.createUser(requestBody).then((created) => {
                console.log(created)
                if (created) {
                    res.status(201).send();
                }

                res.status(409).send();
            }).catch(error => {
                console.log(error)
                res.status(404).send(error);
            });

        } else {
            res.status(500).send();
        }


        // customerService.getAllCustomers().then(function (customers) {
        //     res.json(customers)
        // }).catch(function (err) {
        //     res.json(err)
        // });
    });

    /*
    * Update user
    */
    router.put('/create', (req, res) => {
        const requestBody = req.body,
            nameIsValid = typeof requestBody.Name !== 'undefined' && requestBody.Name !== '',
            emailIsValid = typeof requestBody.Email !== 'undefined' && requestBody.Email !== '';

        if (nameIsValid && emailIsValid) {
            userService.createUser(requestBody).then(function (user) {
                console.log(user);
                return res.status(201);
            }).catch(error => {
                console.log(error)
                res.status(404).send(error);
            });
        }

        // customerService.getAllCustomers().then(function (customers) {
        //     res.json(customers)
        // }).catch(function (err) {
        //     res.json(err)
        // });
    });

    /*
    * Delete user
    */
    router.delete('/create', (req, res) => {
        const requestBody = req.body,
            nameIsValid = typeof requestBody.Name !== 'undefined' && requestBody.Name !== '',
            emailIsValid = typeof requestBody.Email !== 'undefined' && requestBody.Email !== '';

        if (nameIsValid && emailIsValid) {
            userService.createUser(requestBody).then(function (user) {
                console.log(user);
                return res.status(201);
            }).catch(error => {
                console.log(error)
                res.status(404).send(error);
            });
        }

        // customerService.getAllCustomers().then(function (customers) {
        //     res.json(customers)
        // }).catch(function (err) {
        //     res.json(err)
        // });
    });

    return router;
}