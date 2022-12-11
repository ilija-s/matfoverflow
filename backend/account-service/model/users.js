const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    username : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    email : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    name : {
        type : mongoose.Schema.Types.String
    },
    surname : {
        type : mongoose.Schema.Types.String
    },
    picturePath : {
        type : mongoose.Schema.Types.String
    },
    year : {
        type : mongoose.Schema.Types.String
    },
    course : {
        type : mongoose.Schema.Types.String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;