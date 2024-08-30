// Import necessary modules
const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Assuming you have a database connection module
const masterDataController= require('../controllers/masterdataController')

router.post('/addData', masterDataController.createMasterData);
router.delete('/delete/:id',async (req, res) => {
    const masterId = req.params.id;

    try {
        const result = await db.query('DELETE FROM final_module WHERE MD_ID = ?', [masterId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Master Data not found' });
        }
        res.json({ message: 'Master Data deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');   
    }
});

router.delete('/delete/:id', async(req, res) => {
    const customerId = req.params.id;

    // SQL query to delete the customer
    try {
        const result = await db.query('DELETE FROM customer WHERE CUS_ID = ?', [customerId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'customer not found' });
        }
        res.json({ message: 'customer deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');   
    }
});


router.get('/get-modules', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DISTINCT Module FROM final_module');
        res.json(rows.map(row => ({ Module: row.Module })));
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ error: 'Failed to fetch modules' });
    }
});
router.get('/get-submodules/:module', async (req, res) => {
    const { module } = req.params;
    try {
        const [rows] = await db.query('SELECT DISTINCT Sub_Modue FROM final_module WHERE Module = ?', [module]);
        res.json(rows.map(row => ({ Sub_Modue: row.Sub_Modue })));
    } catch (error) {
        console.error('Error fetching subModules:', error);
        res.status(500).json({ error: 'Failed to fetch subModules' });
    }
});

// Route to get distinct columnNames based on selected module and subModule
router.get('/get-columnNames/:module/:subModule', async (req, res) => {
    const { module, subModule } = req.params;
    try {
        const [rows] = await db.query('SELECT DISTINCT Column_Name FROM final_module WHERE Module = ? AND Sub_Modue = ?', [module, subModule]);
        res.json(rows.map(row => ({ Column_Name: row.Column_Name })));
    } catch (error) {
        console.error('Error fetching columnNames:', error);
        res.status(500).json({ error: 'Failed to fetch columnNames' });
    }
});
// Route to get distinct columnDescriptions based on selected columnName
router.get('/get-columnDescriptions/:columnName', async (req, res) => {
    const { columnName } = req.params;
    try {
        const [rows] = await db.query('SELECT DISTINCT Column_Description FROM final_module WHERE Column_Name = ?', [columnName]);
        res.json(rows.map(row => ({ Column_Description: row.Column_Description })));
    } catch (error) {
        console.error('Error fetching columnDescriptions:', error);
        res.status(500).json({ error: 'Failed to fetch columnDescriptions' });
    }
})

// Route to get filtered master data based on module, subModule, columnName, and columnDescription
router.get('/get-masterdata', async (req, res) => {
    const { module, subModule, columnName, columnDescription } = req.query;
    let query = 'SELECT * FROM final_module WHERE 1=1'; // 1=1 is a dummy condition to facilitate appending filters

    const params = [];

    if (module) {
        query += ' AND Module = ?';
        params.push(module);
    }
    if (subModule) {
        query += ' AND Sub_Modue = ?';
        params.push(subModule);
    }
    if (columnName) {
        query += ' AND Column_Name = ?';
        params.push(columnName);
    }
    if (columnDescription) {
        query += ' AND Column_Description = ?';
        params.push(columnDescription);
    }

    try {
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching master data:', error);
        res.status(500).json({ error: 'Failed to fetch master data' });
    }
});
module.exports = router;
