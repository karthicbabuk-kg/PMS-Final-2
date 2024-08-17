const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models/db')

const companyController = require('../controllers/companyController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const originalName = file.originalname; // Original file name
        cb(null, `${currentDate}-${originalName}`);
    }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single('CCP_LOGO'), companyController.addCompany);
router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM companies');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});
router.delete('/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
        const result = await db.query('DELETE FROM companies WHERE id = ?', [companyId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
