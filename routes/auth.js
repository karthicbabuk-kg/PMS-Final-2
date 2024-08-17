const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for authentication
router.get('/authenticate', authController.authenticateUser);

// Middleware to ensure the user is authenticated
router.use(authController.ensureAuthenticated);  // This should be a valid middleware function

// Routes for admin, tl, and executive home pages
router.get('/admin', (req, res) => {
    if (req.session.user.role === 'admin') {
        res.sendFile(path.join(__dirname, '../public/ADMIN/home.html'));
    } else {
        res.redirect('/');
    }
});

router.get('/tl', (req, res) => {
    if (req.session.user.role === 'tl') {
        res.sendFile(path.join(__dirname, '../public/TL/home.html'));
    } else {
        res.redirect('/');
    }
});

router.get('/executive', (req, res) => {
    if (req.session.user.role === 'executive') {
        res.sendFile(path.join(__dirname, '../public/EXECUTIVE/home.html'));
    } else {
        res.redirect('/');
    }
});

module.exports = router;
