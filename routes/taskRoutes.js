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
router.post('/add', upload.single('ATK_DOC'), taskController.addTask);

// Route to get tasks
router.get('/get', taskController.getTasks);

// Route to delete a task

router.get('/tasks', async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        res.json(tasks);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/delete/:id', async (req, res) => {
    const groupId = req.params.id;
    try {
        const result = await db.query('DELETE FROM `grp` WHERE id = ?', [groupId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json({ message: 'task deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/delTask/:id', async (req, res) => {
    const groupId = req.params.id;
    try {
        const result = await db.query('DELETE FROM `executivetask` WHERE id = ?', [groupId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json({ message: 'task deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});

router.get('/gets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT employee, company FROM grp');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching group data:', error);
        res.status(500).json({ error: 'Failed to fetch group data' });
    }
});

router.delete('/owndelete/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        // Replace with your database query to delete the task
        await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
module.exports = router;
