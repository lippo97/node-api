// Require mongoose and mongoose.Schema
var mongoose  = require('mongoose');

var tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true 
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

tokenSchema.methods = {
    // time in milliseconds
    hasExpired: function(time) {
        var now = new Date();
        return (now.getTime() - createDate.getTime()) > time
    }
}

mongoose.model('Token', tokenSchema);
module.exports = tokenSchema;
