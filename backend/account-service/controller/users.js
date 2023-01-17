const { size } = require('lodash');
const mongoose = require('mongoose');

const User = require('../model/users');

const getAllUsers = async (req, res, next) => {
  try{
    const allUsers =  await User.getAllUsers();
    res.status(200).json(allUsers);
  }
  catch (err){
    next();
  }
};


const getUserByUsername = async (req, res, next) => {
    const _username = req.params.username;
    let user = await User.findUser(_username);
    if (size(user) == 0) {
      res.status(400).json("User does not exist");
    } else {
      res.json(user);
    }
};


const addNewUser = async (req, res, next) => {
  const { username, password, email, name, course } = req.body;
  const imageUrl = "https://lh3.googleusercontent.com/ogw/AOh-ky0F1k8_Yp3mtwyp3xGVgZIrsf0zbxGUlffrRBoJ2mo=s32-c-mo";
  let user = await User.findUser(username);
  if (size(user) == 0) {
    let token = await User.addNewUser(username, password, email, name, imageUrl, course);
    if (!token) {
      res.json('{ error: "Error while trying to create a new user."}').status(400);
    } else {
      res.json({ token });
    }
  } else {
    res.json(`{ msg: "User {user.username} already exists" }`).status(400);
  }
};


const loginUser = async (req, res, next) => {
  const username = req.username;

  try {
    const jwt = await User.getUserJWTByUsername(username);
    return res.status(201).json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
};


const changeUserInfoData = async (req, res, next) => {
  const username = req.username;
  const name = req.body.name;
  const email = req.body.email;

  try {
    if (!email || !name) {
      const error = new Error('New data cannot be empty');
      error.status = 400;
      throw error;
    }

    const jwt = await User.updateUserData(username, name, email);
    return res.status(201).json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
};


const changeUserPassword = async (req, res) => {
  
  const username = req.params.username;

  const user = await User.findUser(username);
  if (size(user) == 0)
  {
    res.status(404).json("user does not exist");
    return;
  }
  else {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const currentPassword = user["password"];
    if (oldPassword == currentPassword)
    {
      try {
        const jwt = await User.setNewPassword(username, newPassword);
        res.status(200).json(jwt);
      } catch (err) {
        res.status(400).json('{ error: "Could not update the password."');
      }
    }
    else {
      res.status(400).json("insert correct password");
    }
  }
};

const deleteUser = async (req, res) => {

  let username = req.params.username;

  let user = await User.findUser(username);

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
      await User.deleteStudent(username);
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

module.exports = {
  getAllUsers,
  getUserByUsername,
  addNewUser,
  loginUser,
  changeUserInfoData,
  changeUserPassword,
  deleteUser,
};
