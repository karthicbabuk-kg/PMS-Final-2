const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const taskController = require('../controllers/taskController');
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

// Route to add a task
router.post('/add', upload.single('DURL'), taskController.addTask);
router.get('/getTask',taskController.getTasks)
// Route to get tasks
router.get('/get-executives', async (req, res) => {
    try {
        // Fetch distinct executives from the groups table, with backticks around the table name
        const [rows] = await db.query(`
            SELECT DISTINCT Select_Employee AS name 
            FROM \`groups\` 
            WHERE Select_Employee IS NOT NULL
        `);

        res.json(rows);
    } catch (err) {
        console.error('SQL error:', err.sqlMessage || err); // Log the specific SQL error message
        res.status(500).send('Server error');
    }
});



router.get('/get-companies', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Company_Accid AS id, Company_Name AS name FROM company
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/get-document-types', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Column_Description AS name FROM final_module 
            WHERE Column_Name = 'Document Type'
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
