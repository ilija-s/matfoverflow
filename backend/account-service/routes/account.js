const express = require("express");
const usersContorller = require('../controller/users');

const router = express.Router();

router.get('/', usersContorller.getAllUsers);

router.get('/:username', usersContorller.getUserByUsername);

router.post('/', usersContorller.addNewUser);

router.put('/:username', usersContorller.changeUserPassword);

router.delete('/:username', usersContorller.deleteUser);

module.exports = router;