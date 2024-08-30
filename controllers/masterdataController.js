const db = require('../models/db');

exports.createMasterData = async (req, res) => {
    try {
        const { module, subModule, columnName, columnDescription, status, addColumnDescription } = req.body;

        // Determine the description to check and insert
        const descriptionToCheck = columnDescription !== addColumnDescription ? addColumnDescription : columnDescription;

        console.log("Description to check:", descriptionToCheck); // Debugging

        // Check if the column description already exists for the given module, subModule, and columnName
        const [existingEntries] = await db.query(
            `SELECT * FROM final_module 
             WHERE Module = ? AND Sub_Modue = ? AND Column_Name = ? AND Column_Description = ?`,
            [module, subModule, columnName, descriptionToCheck]
        );

        console.log("Existing entries:", existingEntries); // Debugging

        if (existingEntries.length > 0) {
            // If the column description already exists, return an error
            res.status(400).send('Error: The column description is already available.');
        } else {
            // If the column description doesn't exist, insert the new data
            const result = await db.query(
                `INSERT INTO final_module (Module, Sub_Modue, Column_Name, Column_Description, Status) 
                VALUES (?, ?, ?, ?, ?)`,
                [module, subModule, columnName, descriptionToCheck, status]
            );

            console.log("Insert Result: ", JSON.stringify(result));
            res.redirect('../ADMIN/home.html');
        }
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};

exports.deleteMasterData = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).send('Error: ID is required.');
        }

        // Delete the record from the database
        const result = await db.query(
            `DELETE FROM final_module WHERE # = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send('Record deleted successfully.');
        } else {
            res.status(404).send('Error: Record not found.');
        }
    } catch (error) {
        console.error('Error deleting record:', error);
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
