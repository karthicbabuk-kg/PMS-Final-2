const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterdataController')
const db = require('../models/db')

// Route to handle creating master data
router.post('/masterdata', masterDataController.createMasterData);
// router.get('/get', (req, res) => {
//     const sqlQuery = 'SELECT * FROM masterdata'; // Replace 'master_data' with your actual table name
//     db.query(sqlQuery, (err, results) => {
//         if (err) throw err;
//         res.render('masterdata', { data: results });
//     });
// });

router.get('/gets', async (req, res) => {
    try {
        // SQL Query to get data from your SQL table
        const [rows] = await db.query('SELECT id, module, subModule, columnName, columnDescription, status FROM masterdata');
        
        // Send the result back as JSON
        res.json(rows);  // Send the rows array containing the data
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Perform the SQL query to delete the record
        const result = await db.query('DELETE FROM masterdata WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ error: 'Failed to delete record' });
    }
});
module.exports = router;
