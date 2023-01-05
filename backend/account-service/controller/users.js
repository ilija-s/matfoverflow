const { size } = require('lodash');
const mongoose = require('mongoose');

const users = require('../model/users');

const getAllUsers = async (req, res, next) => {
  try{
  const allUsers =  await users.getAllUsers();
  res.status(200).json(allUsers);
  }
  catch (err){
    next;
  }
};


const getUserByUsername = async (req, res, next) => {
    const _username = req.params.username;
    let student = await users.findStudent(_username);
    if (size(student) == 0)
      res.status(400).json("student does not exist");
    else 
      res.status(200).json(student);

};



const addNewUser = async (req, res, next) => {
  let isAdded = false;
  const newUser = req.body;
  // console.log(newUser["username"] + " body");
  let username = newUser["username"];
  let password = newUser["password"];
  let email = newUser["email"];
  let user = await users.findStudent(username);
  if (size(user) == 0)
  {
    res.json("student will be added").status(200);
    await users.addNewUser(username, password, email);
  }
  else {
    res.json(user).status(400);
  }
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
