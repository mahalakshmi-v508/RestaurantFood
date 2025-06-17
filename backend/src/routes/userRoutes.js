const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Register & Login
router.post('/register', userController.register);
router.post('/login', userController.login);

// ✅ Get All Users
router.get('/users', userController.getUsers);

module.exports = router;
