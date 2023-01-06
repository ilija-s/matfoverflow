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
        type : mongoose.Schema.Types.String,
        default : "/"
    },
    surname : {
        type : mongoose.Schema.Types.String,
        default : "/"
    },
    picturePath : {
        type : mongoose.Schema.Types.String,
        default : "/"
    },
    year : {
        type : mongoose.Schema.Types.String,
        default : "/"
    },
    course : {
        type : mongoose.Schema.Types.String,
        default : "/"
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
    return student;
}

module.exports.addNewUser = async function (username, password, email)
{
   
      let newUsers = await User.insertMany({
        username : username, 
        email : email,
        password : password
      })
      return newUsers;
}

module.exports.setNewPassword = async function (username, newPassword)
{
    let student = await User.updateOne({username : username}, {password : newPassword})
    .exec();
}

module.exports.deleteStudent = async function (username)
{
    await User.deleteOne({username : username}).exec();
}