const db = require('../models/db');

// Function to create new master data
exports.createMasterData = async (req, res) => {
    try {
        const { module, subModule, columnName, columnDescription, status, addColumnDescription } = req.body;

        // Check if the column description already exists
       
        // Insert new master data
        const result = await db.query(
            `INSERT INTO masterdata (module, subModule, columnName, columnDescription, status, addColumnDescription) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [module, subModule, columnName, columnDescription !== "EDQ" ? columnDescription : addColumnDescription, status, addColumnDescription]
        );

    console.log("Insert Result: ", JSON.stringify(result));
    res.redirect('../ADMIN/MasterData.html'); 
} catch (error) {
    console.error('Database insert error:', error);
    res.status(500).send('Server error');
}
};

// exports.getMasterData = async (req, res) => {
//     try {
//         // Fetch master data
//         const result = await db.query(`SELECT * FROM masterdata`);
        
//         // Send the data as JSON
//         res.json(result);
//     } catch (error) {
//         console.error('Database fetch error:', error);
//         res.status(500).send('Server error');
//     }
// };
