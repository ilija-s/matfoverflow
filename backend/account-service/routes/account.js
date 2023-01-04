const express = require("express");
const usersContorller = require('../controller/users');

const router = express.Router();

router.get('/', (req, res) => 
{
    res.send("cao").status(200);
})

router.get('/:username', usersContorller.getUserByUsername);

router.post('/', usersContorller.addNewUser);

router.put('/', usersContorller.changeUserPassword);

router.delete('/:username', usersContorller.deleteUser);

module.exports = router;