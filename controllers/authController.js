var User = require("../models/user")

var authController = {

    // POST /login
    login: function(request, response) {
        //response.json({
            //status: 200,
            //message: "Welcome to the coolest API on the earth!",
            //username: request.body.username,
            //password: request.body.password
        //});

        var username = request.body.username || "";
        var password = request.body.username || "";

        if (username == "" || passoword == "") {
            response.json({
                status: 401,
                message: "You must provide not blank username and password"
            });
        }

        // If I have data i try to authenticate the user


    },

    // POST /signin
    signin: function(request, response) {
        var username = request.body.username || "";
        var password = request.body.password || "";

        if (username == "" || password == "") {
            response.json({
                status: 401,
                message: "You must provide not blank username and password"
            });
            return;
        } 

        // If I have data i create the user
        var u = new User({
            username: username,
            password: password
        });

        // Then save it
        // TODO: Switch error codes
        // TODO: Not return the whole user object
        u.save(function(err) {
            if (err) {
                response.json({
                    status: 402,
                    code: err.code,
                    message: "Mongodb error"
                }); 
            } else {
                response.json({
                    status: 200,
                    message: "User saved successfully",
                    user: u
                });
            }
        });
    }

};

module.exports = authController;
