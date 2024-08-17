const mysql = require('mysql2/promise');
const pool = require('../models/db'); // Assume you have a DB connection pool

exports.authenticateUser = async (req, res) => {
    const { role, username, password } = req.query;

    try {
        let user;

        // If the role is 'admin', check in the 'User' table
        if (role === 'admin') {
            const [rows] = await pool.query('SELECT * FROM users WHERE role = ? AND username = ? AND password = ?', [role, username, password]);
            user = rows[0]; // Assumes the User table has role, username, and password fields

        // If the role is 'tl' or 'executive', check in the 'Employee' table
        } else if (role === 'tl' || role === 'executive') {
            const [rows] = await pool.query('SELECT * FROM employees WHERE departmentDesignation = ? AND loginID = ? AND pass = ?', [role === 'tl' ? 'Team Lead' : 'Executive', username, password]);
            user = rows[0]; // Assumes the Employee table has departmentDesignation, loginID, and pass fields
        }

        // Validate user and set session
        if (user) {
            req.session.user = { role: role, username: user.username };
            res.redirect('/' + role); // Redirect based on the role
        } else {
            res.status(401).send('Unauthorized: Invalid username, password, or role');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();  // Allow the next middleware or route handler to execute
    } else {
        res.redirect('/');  // Redirect to login page if not authenticated
    }
};