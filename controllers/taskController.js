const db = require('../models/db');
const path = require('path');

// Add Task
exports.addTask = async (req, res) => {
    const {
         ATK_DD_CMP, ATK_TN, ATK_DD_FILE, ATK_REM, ATK_DD_STA, ATK_DET
    } = req.body;

    // Multer stores the file path in `req.file` if a file is uploaded
    const documentPath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const [result] = await db.query(
            `INSERT INTO assign_task ( companyName, taskName, file, remarks, status, taskDetails, document) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                 ATK_DD_CMP, ATK_TN, ATK_DD_FILE, ATK_REM, ATK_DD_STA, ATK_DET, documentPath
            ]
        );

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../TL/addtask.html');
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};
// Get Tasks
exports.getTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const result = await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
};
