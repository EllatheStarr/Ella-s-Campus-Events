const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, profile_picture, preferences, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            profile_picture,
            preferences,
            role,
        });

        await newUser.save();

        // Return the created user (excluding the password)
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profile_picture: newUser.profile_picture,
            preferences: newUser.preferences,
            role: newUser.role,
            created_at: newUser.created_at,
            updated_at: newUser.updated_at,
        };

        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users, excluding the password field
        const users = await User.find().select('-password');
        
        // If no users are found, return a meaningful response
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Respond with the list of users
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists (case insensitive search)
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Return user details (excluding password) as the response
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            profile_picture: user.profile_picture,
            preferences: user.preferences,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        res.status(200).json({ message: 'Login successful', user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Logout a user
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { preferences } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { preferences },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
    try {
        console.log('Request User:', req.user);
console.log('Request User ID:', req.user?.id);

        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};