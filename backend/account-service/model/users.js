const { unset } = require('lodash');
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
    imageUrl : {
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
    },
    score : {
        type : mongoose.Schema.Types.Number,
        default : 0
    },
    upvotes : {
        type : mongoose.Schema.Types.Number,
        default : 0
    },
    downvotes : {
        type : mongoose.Schema.Types.Number,
        default : 0
    },
    
})

const User = mongoose.model('user', userSchema);

module.exports = User;

module.exports.getAllUsers = async () => {
    let users = await User.find({}).exec();
    return users;
}

module.exports.findUser = async function(username) {
    let student = await User.find({username : username}).exec();
    return student;
}

module.exports.loginUser = async function(username, password)
{
    let user = await User.find({username : username, password : password}).exec();
    return user;
}

module.exports.addNewUser = async function (username, password, email, name, surname, 
    picturePath, year, course, score, upvotes, downvotes) {
    if (email == undefined || username == undefined || password == undefined)
    {
        return null;
    }
   
      let newUsers = await User.insertMany({
        username : username, 
        email : email,
        password : password, 
        name : name,
        surname : surname,
        picturePath : picturePath,
        year : year,
        course : course,
        score : score,
        upvotes : upvotes, 
        downvotes: downvotes
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