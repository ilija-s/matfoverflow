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

const User = mongoose.model('user', userSchema);

module.exports = User;

module.exports.getAllUsers = async () => {
    let users = await User.find({}).exec();
    return users;
}

module.exports.findStudent = async function(username) {

    let student = await User.find({username : username}).exec();
    if (student.length == 0)
        return null;
    return student;
}
