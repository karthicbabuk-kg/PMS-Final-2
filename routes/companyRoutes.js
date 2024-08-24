const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models/db');
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

router.post('/add', upload.single('Company_Logo'), companyController.addCompany);


router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM company');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
        const result = await db.query('DELETE FROM company WHERE CM_ID = ?', [companyId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');   
    }
});

router.get('/edit/:id', (req, res) => {
    const companyId = req.params.companyId;
    
    const sqlQuery = 'SELECT * FROM company WHERE CM_ID = ?';
    db.query(sqlQuery, [companyId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.json(result[0]); // Assuming you only want one company based on id
    });
});

router.put('/putEdit/:id', (req, res) => {
    const companyId = req.params.companyId;
    const updatedData = req.body;
  
    const sqlQuery = 'UPDATE company SET ? WHERE CM_ID = ?';
    db.query(sqlQuery, [updatedData, companyId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.send('Company updated successfully');
    });
  });
module.exports = router;
