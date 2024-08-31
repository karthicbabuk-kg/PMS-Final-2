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
router.get('/getTask', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM assign_task');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});
router.delete('/owndelete/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const result = await db.query('DELETE FROM assign_task WHERE AT_ID = ?', [taskId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});


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
            SELECT DISTINCT Company_Id AS id, Company_Name AS name FROM customer_documents
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
            SELECT DISTINCT Document_Type FROM customer_documents 
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


router.get('/edit/:id', async (req, res) => {
    const assignId = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM assign_task WHERE AT_ID = ?', [assignId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'task not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

router.put('/putEdit/:assignId', async (req, res) => {
    const assignId = req.params.assignId;
    const updatedCompany = req.body;

    console.log('Received data:', updatedCompany); // Debugging: Log incoming data

    const updateQuery = `
        UPDATE assign_task
        SET 
            Executive_Name = ?, Company_Id = ?, Company_Name = ?, Document_Type = ?, Document_Name = ?, Doument_URL = ?, 
            Task_Name = ?, Task_Details = ?, Status = ?, Remarks = ?
        WHERE 
            AT_ID  = ?
    `;

    const values = [
        updatedCompany.Executive_Name, updatedCompany.Company_Id, updatedCompany.Company_Name, updatedCompany.Document_Type, 
        updatedCompany.Document_Name, updatedCompany.Doument_URL, updatedCompany.Task_Name, updatedCompany.Task_Details, 
        updatedCompany.Remarks, updatedCompany.Status ,assignId
    ];

    console.log('Update values:', values); // Debugging: Log the values being passed to the query

    try {
        const result = await db.query(updateQuery, values);
        console.log('Query result:', result); // Debugging: Log the result of the query
        res.status(200).send('task details updated successfully');
    } catch (error) {
        console.error('Error updating task details:', error);
        res.status(500).send('Failed to update task details');
    }
});

module.exports = router;
