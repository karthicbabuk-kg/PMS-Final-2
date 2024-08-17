// controllers/customerController.js

const db = require('../models/db');

exports.uploadCustomerDocument = async (req, res) => {
    const { CD_CN, CD_AN, CD_PN, CD_BN } = req.body;

    // Get file paths from uploaded files
    const aadharImage = req.files['CD_AI'] ? `/uploads/${req.files['CD_AI'][0].filename}` : null;
    const panImage = req.files['CD_PI'] ? `/uploads/${req.files['CD_PI'][0].filename}` : null;
    const bankPassbookImage = req.files['CD_BI'] ? `/uploads/${req.files['CD_BI'][0].filename}` : null;

    try {
        const [result] = await db.query(
            `INSERT INTO customer_documents (customer_name, aadhar_no, aadhar_image_path, pan_no, pan_image_path, bank_account_no, bank_passbook_image_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [CD_CN, CD_AN, aadharImage, CD_PN, panImage, CD_BN, bankPassbookImage]
        );

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../ADMIN/cutomerdocuments.html'); // Redirect after successful insert
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};
