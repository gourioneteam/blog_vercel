const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    req.flash('success', 'You have registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Username already exists' });
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/users/login');
    }
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    req.session.token = token;
    req.flash('success', 'You are logged in');
    res.json({ token });
  } catch (error) {
    req.flash('error', 'An error occurred');
    res.redirect('/users/login');
  }
});

// Check authentication
router.get('/checkAuth', (req, res) => {
  const token = req.session.token;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    console.log(decoded)
    res.json({ isAuthenticated: true, username: decoded.username });
    // auth()
  } catch (error) {
    res.json({ isAuthenticated: false });
  }
});


// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ message: 'Logged out successfully' }); // Send a JSON response
  });
});

module.exports = router;
