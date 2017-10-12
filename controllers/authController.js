var User   = require('../models/user')

var authController = {

    // POST /login
    login: function(request, response) {
        var username = request.body.username || "";
        var password = request.body.password || "";

        if (username == "" || password == "") {
            response.json({
                status: 401,
                message: "You must provide not blank username and password."
            });
            return;
        }

        // At this point I have to look for the user in the database
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                response.json({
                    status: 500,
                    message: "Internal error."
                });
                return;
            }
            // If I don't find any user with the passed username
            // a 401 status will be given back
            if (!user) {
                response.json({
                    status: 401,
                    message: "You must provide valid username/password.",
                });
                return;
            }
            // At this point I found the requested user, so I have to check 
            // his password field to match the sent one
            if (!user.isValidPassword(password)) {
                response.json({
                    status: 401,
                    message: "You must provide valid username/password.",
                });
                return;
            }
            // At this point the user has provided the right password
            // and it has been authenticated:
            var tokens = user.getTokens();
            response.set('Set-Cookie', 'refresh_token=' + tokens.refresh_token + '; HttpOnly');
            response.json({
                status: 200,
                message: "You have been authenticated.",
                access_token: tokens.access_token
            });
        });
    },

    // POST /signin
    signin: function(request, response) {
        var username = request.body.username || "";
        var password = request.body.password || "";

        if (username == "" || password == "") {
            response.json({
                status: 401,
                message: "You must provide not blank username and password."
            });
            return;
        } 

        User.create({
                username: username,
                password: password
            },

            function(err, user) {
                if (err) {
                    response.json({
                        status: 402,
                        code: err.code,
                        message: "Mongodb error."
                    }); 
                } else {
                    response.json({
                        status: 200,
                        message: "User saved successfully.",
                        user: user
                    });
                }
            }
        );
    },

    getAll: function(request, response) {
        User.find({}, function(err, users) {
            if (err) {
                response.json({
                    status: 500,
                    message: "Internal error."
                });
                return;
            }
            console.log(request.cookies);
            response.json({
                users: users
            });
        });
    }

};

module.exports = authController;
