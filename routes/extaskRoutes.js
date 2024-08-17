const express = require('express');
const router = express.Router();
const taskController = require('../controllers/extaskController');
const db = require('../models/db');

// Define the route to handle the task form submission
router.post('/add', taskController.addTask);
router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM executiveTask'); // Replace with your actual SQL query
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Server error');
    }
});

router.get('/get',taskController.getexecutiveDetail);

router.delete('/delete/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        // Replace with your database query to delete the task
        const result = await db.query('DELETE FROM executivetask WHERE id = ?', [taskId]);

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
