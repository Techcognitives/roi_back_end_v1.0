const mangoose = require('mongoose');

const userSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    name: {type: String},
    practiceName: {type: String},
    createdDate: {type: String},
    isAdmin: {type: Boolean,
        default: false},
    email: {
        type: String,  
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
});

module.exports = mangoose.model('User', userSchema);