// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const customerController = require('../controllers/customerDocController');

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


// Route to handle customer document upload
router.post('/upload', upload.fields([
    { name: 'CD_AI', maxCount: 1 },
    { name: 'CD_PI', maxCount: 1 },
    { name: 'CD_BI', maxCount: 1 }
]), customerController.uploadCustomerDocument);

router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customer_documents');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        const result = await db.query('DELETE FROM customer_documents WHERE id = ?', [documentId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
