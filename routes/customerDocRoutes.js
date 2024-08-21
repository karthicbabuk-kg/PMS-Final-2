const express = require('express');
const multer = require('multer');
const db = require('../models/db');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Save to 'uploads/' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Fetch distinct account owners from the customer table
router.get('/getAccountOwners', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DISTINCT Account_Owner FROM customer');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching account owners:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to fetch Company IDs
router.get('/getCompanyIds', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DISTINCT Company_Accid FROM company');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching company IDs:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to fetch Company Name based on selected Company ID
router.get('/getCompanyName/:companyId', async (req, res) => {
    const { companyId } = req.params;
    try {
        const [rows] = await db.query('SELECT Company_Name FROM company WHERE Company_Accid = ?', [companyId]);
        res.json(rows[0] || {});
    } catch (error) {
        console.error('Error fetching company name:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to fetch Document Types
router.get('/getDocumentTypes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT Column_Description FROM final_module WHERE Column_Name = 'Document Type'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});



router.post('/upload', upload.single('DURL'), async (req, res) => {
    const { ANTO, CMID, CMN, DCT, DOCN } = req.body;
    const documentUrl = req.file ? req.file.filename : null;

    try {
        // Correct column name in the SQL query
        const query = `INSERT INTO customer_documents (Account_Owner, Company_ID, Company_Name, Document_Type, Document_Name, Document_URL) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [ANTO, CMID, CMN, DCT, DOCN, documentUrl];
        const [result] = await db.query(query, values);
        console.log("Insert Result: ", JSON.stringify(result));
        
        res.redirect('../ADMIN/cutomerdocuments.html'); // Redirect after successful upload
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
module.exports = router;
