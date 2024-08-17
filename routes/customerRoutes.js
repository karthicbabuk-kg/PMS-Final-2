// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const db = require('../models/db');
const { route } = require('./taskRoutes');

// Route to show the add customer form

// Route to handle form submission
router.post('/add', customerController.addCustomer);

router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customers');
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/delete/:id', (req, res) => {
    const customerId = req.params.id;

    // SQL query to delete the customer
    const sql = 'DELETE FROM customers WHERE id = ?';
    db.query(sql, [customerId], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).send('Server error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Customer not found');
        }

        res.status(200).send('Customer deleted');
    });
});

module.exports = router;
