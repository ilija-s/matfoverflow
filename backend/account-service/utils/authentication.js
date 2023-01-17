const express = require('express');
const User = require('../model/users');
const jwt = require('./jwt');


module.exports.canAuthenticate = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);

  try {
    if (!username || !password) {
      const error = new Error('Please provide both username and password');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ username }).exec();
    if (!user) {
      const error = new Error(`User with username ${username} does not exist!`);
      error.status = 404;
      throw error;
    }

	console.log(user.password);
    if (password !== user.password) {
      const error = new Error(`Wrong password for username ${username}!`);
      error.status = 401;
      throw error;
    }

    req.userId = user._id;
    req.username = user.username;

    next();
  } catch (err) {
    next(err);
  }
};


module.exports.isAuthenticated = async (req, res, next) => {
	try {
	  const authHeader = req.header("Authorization");
	  if (!authHeader) {
		const error = new Error('You need to pass Authorization header with your request!');
		error.status = 403;
		throw error;
	  }
  
	  const token = authHeader.split(' ')[1];
	  const decodedToken = jwt.verifyJWT(token);
	  if (!decodedToken) {
		const error = new Error('Not Authenticated!');
		error.status = 401;
		throw error;
	  }
  
	  req.userId = decodedToken.id;
	  req.username = decodedToken.username;
  
	  next();
	} catch (err) {
	  next(err);
	}
  };
  