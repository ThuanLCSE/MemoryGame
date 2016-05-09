// Invoke 'strict' JavaScript mode
'use strict';
// Load the module dependencies
var User = require('mongoose').model('User'),
    history = require('mongoose').model('History');
// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
    // Create a new 'User' model instance
    var newUser = new User(req.body);
    // Try saving the new user document
    newUser.save(function(err, user) {
        // If an error occurs, use flash messages to report the error
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            var newSession = req.session;
            var authenticatedUser = {
                username: user.username,
                fullName: user.fullName
            }
            newSession.user = authenticatedUser;
            return res.status(200).send(authenticatedUser);
        }
    });
};
exports.authenBySession = function(req, res) {
    var userInSession = req.session.user;
    var response = {};
    if (!userInSession) {
        response = {
            message: 'User not in sess'
        };
    } else {
        response = userInSession;
    }
    return res.status(200).send(response);
}
exports.signin = function(req, res) {
    var accessingUser = req.body.user;
    User.findOne({
        username: accessingUser.username
    }, function(err, user) {
        if (!user) {
            return res.status(200).send({
                message: 'Wrong username password'
            });
        } else {
            var newSession = req.session;
            var authenticatedUser = {
                username: user.username,
                fullName: user.fullName
            }
            newSession.user = authenticatedUser;
            return res.status(200).send({
                fullName: user.fullName
            });
        }
    });
};
// Create a new controller method for signing out
exports.signout = function(req, res) {
    req.session.user = undefined;
    if (req.session.user == undefined) {
        return res.status(200).send({
            message: 'user out success'
        });
    } else {
        return res.status(401).send({
            message: 'logout failed'
        });
    }
};
// Create a new controller middleware that is used to authorize authenticated operations 
exports.checkAuthenticated = function(req, res, next) {
    // If a user is not authenticated send the appropriate error message
    if (req.session.user == undefined) {
        // If an error occurs send the error message
        return res.status(400).send({
            message: 'Not authenticated'
        });
    } else {
        next();
    }
};
exports.updateResult = function(req, res) {
    var userInSession = req.session.user;
    var newResult = new history(req.body.result);
    User.findOne({
        username: userInSession.username
    }, function(err, user) {
        if (!user) {
            return res.status(400).send({
                message: 'Cannot find user'
            });
        } else {
            console.log(user.playingTime);
            user.playingTime.push(newResult);
            user.save(function(err, user) {
                if (err) {
                    // If an error occurs send the error message
                    return res.status(400).send({
                        message: 'save failed'
                    });
                } else {
                    return res.status(200).send({
                        playingHistory: user.playingTime
                    });
                }
            });
        }
    });
    // Try saving the updated article
};
exports.getPlayingHistory = function(req, res) {
    var userInSession = req.session.user;
    User.findOne({
        username: userInSession.username
    }, function(err, user) {
        if (!user) {
            return res.status(200).send({
                message: 'Cannot find user'
            });
        } else {
            return res.status(200).send({
                playingHistory: user.playingTime
            });
        }
    });
};