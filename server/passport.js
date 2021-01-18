const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');
const userService = require('./services/userService');
const { USER_VALID, USER_NOT_VALID } = require('./settings/index');
/*
* Passport Configuration
*/

module.exports = function (passport) {
    const User = models.User;

    console.log('Initialise Passport');

    // serialize
    passport.serializeUser(function (user, done) {
        console.log('serialise user')
        console.log(JSON.stringify(user))
        done(null, {
            id: user.Id,
            name: user.Name,
            email: user.Email
         });
    });

    // deserialize user 
    passport.deserializeUser(function (obj, done) {
        // console.log('deserialise user ' + id)
        // User.findById(id).then(function (user) {
        //     if (user) {
        //         done(null, user.get());
        //     } else {
        //         done(user.errors, null);
        //     }
        // });
        console.log("deserializing " + JSON.stringify(obj));
        done(null, obj);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'Email',
        passwordField: 'Email',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        userService.getUser(email).then((user) => {
            if (user) {
                return done(null, true, USER_VALID);
            }

            return done(null, false, USER_NOT_VALID);         
        })

        // User.findOne({
        //     where: {
        //         email: email
        //     }
        // }).then(function (user) {
        //     console.log(JSON.stringify(user))
        //     console.log('found a user')


        //     if (user) {
        //         // USER FOUND
        //         return done(null, false, {
        //             message: 'USER_EXISTS'
        //         });

        //     } else {
        //         // USER NOT FOUND - REGISTER
        //         var data = {
        //             email: email,
        //             password: password,
        //             name: req.body.Name,
        //         };
        //         console.log('create a new user')
        //         User.create(data).then(function (newUser, created) {
        //             if (!newUser) {
        //                 return done(null, false);
        //             }

        //             if (newUser) {
        //                 return done(null, newUser);
        //             }
        //         });
        //     }
        // });
    }
    ));

    return passport;
}