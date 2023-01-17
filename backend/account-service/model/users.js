const mongoose = require('mongoose');
const jwtUtil = require('../utils/jwt');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
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
        required : true
    },
    surname : {
        type : mongoose.Schema.Types.String,
        default : ""
    },
    imageUrl : {
        type : mongoose.Schema.Types.String,
        default : ""
    },
    year : {
        type : mongoose.Schema.Types.String,
        default : ""
    },
    course : {
        type : mongoose.Schema.Types.String,
        default : ""
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
    const user = await User.findOne({ username }).exec();
    return user;
}

module.exports.getUserJWTByUsername = async function(username) {
    const user = await this.findUser(username);

    if (!user) {
      throw new Error(`User with username ${username} does not exist!`);
    }
    return jwtUtil.generateJWT({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      imgUrl: user.imgUrl
    });
  }


module.exports.addNewUser = async function (username, password, email, name, imageUrl, course) {
    if (!email || !username || !password || !name) {
        return null;
    }

	const newUser = new User();
	newUser._id = new mongoose.Types.ObjectId();
	newUser.username = username;
	newUser.password = password;
	newUser.email = email;
	newUser.name = name;
    newUser.imageUrl = imageUrl;

    if (!course) {
        newUser.course = course;
    }
   
    await newUser.save();

    return this.getUserJWTByUsername(newUser.username);
}


module.exports.updateUserData = async function (username, name, email) {
    const user = await this.findUser(username);
    user.name = name;
    user.email = email;
    await user.save();
    return this.getUserJWTByUsername(username);
}


module.exports.setNewPassword = async function (username, newPassword)
{
    const user = await User.updateOne({username : username}, {password : newPassword}).exec();
    return this.getUserJWTByUsername(user.username);
}

module.exports.deleteStudent = async function (username)
{
    await User.deleteOne({username : username}).exec();
}