const express = require("express");
const usersContorller = require('../controller/users');

const router = express.Router();

router.get('/:username', usersContorller.getUserByUsername);

router.post('/', usersContorller.addNewUser);

router.put('/', usersContorller.changeUserPassword);

router.delete('/:username', usersContorller.deleteUser);

module.exports = router;