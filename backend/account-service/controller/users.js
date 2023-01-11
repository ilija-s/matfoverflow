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
    let student = await users.findUser(_username);
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
  let user = await users.findUser(username);
  if (size(user) == 0)
  {
    let newUser = await users.addNewUser(username, password, email);
    if (newUser == null)
    {
      res.json("input email, password and username!").status(400);
      return;
    }
    else 
    {
      res.json(newUser).status(200);
    }
  }
  else {
    res.json(`username ${username} already exists`).status(400);
  }
};


const changeUserPassword = async (req, res) => {
  
  const username = req.params.username;

  const user = await users.findUser(username);
  if (size(user) == 0)
  {
    res.status(404).json("user does not exist");
    return;
  }
  else {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const currentPassword = user[0]["password"];
    if (oldPassword == currentPassword)
    {
      res.status(200).json("password successfully changed");
      await users.setNewPassword(username, newPassword);
    }
    else {
      res.status(400).json("insert correct password");
    }
  }
};

const deleteUser = async (req, res) => {

  let username = req.params.username;

  let user = await users.findUser(username);

  if (size(user) == 0)
  {
    res.status(404).json("user does not exist");
    return;
  }
  else 
  {
    const password = req.body.password;
    if (password == undefined)
    {
      res.status(400).json("input password fist!");
      return;
    }
    if (password == user[0]["password"])
    {
      await users.deleteStudent(username);
      res.status(200).json(`student ${username} deleted!`);
      return;
    }
    else 
    {
      res.status(400).json("incorrect password, student can't be deleted");
      return;
    }
  }


};

// console.log(getAllUsers());

module.exports = {
  getAllUsers,
  getUserByUsername,
  addNewUser,
  changeUserPassword,
  deleteUser,
};
