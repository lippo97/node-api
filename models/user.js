// Require mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var jwt      = require('jsonwebtoken');

// Defining the user schema
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// Before saving the user
userSchema.pre('save', function(callback) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    callback();
});

userSchema.methods = {
    isValidPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    },

    getToken: function() {
        var token = jwt.sign({
            id: this._id
        }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
        return token;
    }
}

userSchema.statics = {
    isValidToken: function(token) {
        // invalid token - synchronous
        try {
            var decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            console.log(decoded);
        } catch(err) {
            console.log(err);
        }
    }
}


// Creating the model and exporting it
module.exports = mongoose.model('User', userSchema);
