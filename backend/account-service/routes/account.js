const express = require("express");
const userController = require('../controller/users');
const authentication = require('../utils/authentication');


const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:username', userController.getUserByUsername);

router.post('/login', authentication.canAuthenticate, userController.loginUser);

router.post('/', userController.addNewUser);

router.patch('/', authentication.isAuthenticated, userController.changeUserInfoData);

router.put('/:username', userController.changeUserPassword);

router.delete('/:username', userController.deleteUser);

module.exports = router;