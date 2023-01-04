const mongoose = require('mongoose');

const users = require('../model/users');
const bodyParser = require('body-parser');

const getAllUsers = async (req, res, next) => {
  try{
  const allUsers =  await users.find({}).exec();
  console.log(allUsers);
  res.status(200).json(allUsers);
  }
  catch (err){
    next;
  }
};

// getAllUsers();

const getUserByUsername = async (req, res, next) => {
  const _username = req.bodyParser;    
  console.log(_username);
    try {
      if (_username == undefined){
        res.status(400);
      }
      const student = await users.find({username : _username}).exec();
      console.log(student + "da");
      res.status(200).json(student);
    }
    catch(err){
      console.log("ne");
      next;
    };
}

// getUserByUsername("Dusan");



const addNewUser = async (req, res, next) => {
  let isAdded = false;
  const {email, user_id, username, password} = req.bodyParser;
  const newUser = {
    username,
    email,
    password,
    user_id
  };

  
  const user = getUserByUsername(username);
  
  if (user == null) {
    await users.insertMany(newUser).exec();
    isAdded = true;
  }
  
  return isAdded;
};


const changeUserPassword = (username, oldPassword, newPassword) => {
  const foundUser = users.find(user => user.username == username && user.password == oldPassword);
  if (!foundUser) {
    return false;
  }

  foundUser.password = newPassword;
  return true;
};

const deleteUser = (username) => {
  const userIndex = users.findIndex(user => user.username == username);
  if (userIndex == -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  return true;
};

// console.log(getAllUsers());

module.exports = {
  getAllUsers,
  getUserByUsername,
  addNewUser,
  changeUserPassword,
  deleteUser,
};
