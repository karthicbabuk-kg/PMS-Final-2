const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');
const db = require('../models/db')

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


// Routes for employee operations
router.post('/add', upload.single('AEM_DOC'), employeeController.addEmployee);

router.get('/get', async (req, res) => {
    try {
        const [employees] = await db.query('SELECT * FROM employees');
        res.json(employees);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

router.get('/companies', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT company_name FROM companies');
      res.json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });

  router.delete('/delete/:id', employeeController.deleteEmployee);
// Placeholder routes for other operations (update, delete)
// router.get('/get', employeeController.getEmployees);
// router.delete('/:id', employeeController.deleteEmployee);
// router.put('/:id', upload.single('employeePhoto'), employeeController.updateEmployee);

module.exports = router;
