const { size } = require('lodash');
const mongoose = require('mongoose');

const users = require('../model/users');

// const getAllUsers = async (req, res, next) => {
//   try{
//   const allUsers =  await users.getAllUsers();
//   res.status(200).json(allUsers);
//   }
//   catch (err){
//     next;
//   }
// };


const getUserByUsername = async (req, res) => {
  const _username = req.body.username;
  console.log(_username);
    let student = await users.getAllUsers();
    if (size(student) == 0)
      res.status(400).json({message : "student does not exist"});
    else 
      res.status(200).json(student);

};

const login = async(req, res) => 
{
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " asd" + password);
  let studentWithPassword = await users.loginUser(username, password);

  let student = await users.findUser(username);
    if (size(student) == 0)
      res.status(400).json({message : "student does not exist"});
    else 
      {
        if (size(studentWithPassword) == 0)
        {
          res.status(404).json({message : "insert correct passsword"});
        }
        else
        {
          res.status(200).json(studentWithPassword);
        }
      }


}



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
      res.json({message : "input email, password and username!"}).status(400);
      return;
    }
    else 
    {
      res.json(newUser).status(200);
    }
  }
  else {
    res.json({message : `username ${username} already exists`}).status(400);
  }
};


const changeUserPassword = async (req, res) => {
  
  const username = req.params.username;

  const user = await users.findUser(username);
  if (size(user) == 0)
  {
    res.status(404).json({message : "user does not exist"});
    return;
  }
  else {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const currentPassword = user[0]["password"];
    if (oldPassword == currentPassword)
    {
      res.status(200).json({message : "password successfully changed"});
      await users.setNewPassword(username, newPassword);
    }
    else {
      res.status(400).json({message : "insert correct password"});
    }
  }
};

const deleteUser = async (req, res) => {

  let username = req.params.username;

  let user = await users.findUser(username);

  if (size(user) == 0)
  {
    res.status(404).json({message : "user does not exist"});
    return;
  }
  else 
  {
    const password = req.body.password;
    if (password == undefined)
    {
      res.status(400).json({message : "input password fist!"});
      return;
    }
    if (password == user[0]["password"])
    {
      await users.deleteStudent(username);
      res.status(200).json({message : `student ${username} deleted!`});
      return;
    }
    else 
    {
      res.status(400).json({message : "incorrect password, student can't be deleted"});
      return;
    }
  }


};

// console.log(getAllUsers());

module.exports = {
  // getAllUsers,
  getUserByUsername,
  addNewUser,
  changeUserPassword,
  deleteUser,
  login
};
