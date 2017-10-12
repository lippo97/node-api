// Require mongoose and mongoose.Schema
var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var crypto      = require('crypto');
var base64url   = require('base64url');

var tokenSchema = require('./token');


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
    createDate: {
        type: Date,
        default: Date.now
    },
    access_tokens:   [tokenSchema],
    refresh_tokens:  [tokenSchema]
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

    getTokens: function() {
        var access_token  = randomStringAsBase64Url(20);
        var refresh_token = randomStringAsBase64Url(20);

        this.access_tokens.push(new Token(access_token));
        this.refresh_tokens.push(new Token(refresh_token));
        console.log(this.access_tokens);

        return {
            access_token:   access_token,
            refresh_token:  refresh_token 
        };
    }
}

userSchema.statics = {
    isValidToken: function(token) {
        return true;
    }
}

function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
}

// Creating the model and exporting it
module.exports = mongoose.model('User', userSchema);
