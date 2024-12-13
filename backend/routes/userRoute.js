const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

// Register a new user
router.post('/register', userController.register);

// Login a user
router.post('/login', userController.login);

// Logout a user
router.post('/logout', userController.logout);

// Get all users
router.get('/', userController.getAllUsers);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile/:id', userController.updateProfile);

// Delete user account
router.delete('/profile/:id', userController.deleteAccount);

module.exports = router;