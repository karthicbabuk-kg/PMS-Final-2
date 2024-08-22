const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const taskController = require('../controllers/extaskController');
const db = require('../models/db');


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

// Define the route to handle the task form submission
router.post('/add1', upload.single('DURL1'), taskController.addTask);
router.get('/getTask1',taskController.getTasks)
router.get('/get-exe', async (req, res) => {
    try {
        // Fetch distinct executives from the groups table, with backticks around the table name
        const [rows] = await db.query(`
            SELECT DISTINCT Select_Lead AS name 
            FROM \`groups\` 
            WHERE Select_Lead IS NOT NULL
        `);

        res.json(rows);
    } catch (err) {
        console.error('SQL error:', err.sqlMessage || err); // Log the specific SQL error message
        res.status(500).send('Server error');
    }
});



router.get('/get-comp', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT Company_Id AS id, Company_Name AS name FROM assign_task
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/get-doc-types', async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        // Replace with your database query to delete the task
        const result = await db.query('DELETE FROM upload_task WHERE id = ?', [taskId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
