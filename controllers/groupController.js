const db = require('../models/db');

exports.addGroup = async (req, res) => {
    const {
        GR_GN, GR_COM, GR_SL, GR_SE
    } = req.body;

    try {

        const query = `
            INSERT INTO \`groups\` (
                Group_Name, Company, Select_Lead, Select_Employee
            ) VALUES (?, ?, ?, ?)
        `;

        const values = [GR_GN, GR_COM, GR_SL, GR_SE];

        const [result] = await db.query(query, values);

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../ADMIN/groups.html'); 
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};


exports.getCompanies= async (req, res) => {
    try {
      const [rows] = await db.query('SELECT DISTINCT Company FROM employee');
      res.json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  };

  exports.getTeamLeads = async (req, res) => {
    const companyName = req.query.companyName;  // Get company name from query parameters

    try {
        const [rows] = await db.query(
            'SELECT DISTINCT Employee_Name FROM employee WHERE Department_Desigination = ? AND Company = ?', 
            ['Team Lead', companyName]
        );
        res.json(rows);  // Send the filtered team leads back as JSON
    } catch (error) {
        console.error('Error fetching team leads:', error);
        res.status(500).send('Server error');
    }
};

// Get executives based on selected company
exports.getExecutives = async (req, res) => {
    const companyName = req.query.companyName;  // Get company name from query parameters

    try {
        const [rows] = await db.query(
            'SELECT DISTINCT Employee_Name FROM employee WHERE Department_Desigination = ? AND Company = ?', 
            ['Executive', companyName]
        );
        res.json(rows);  // Send the filtered executives back as JSON
    } catch (error) {
        console.error('Error fetching executives:', error);
        res.status(500).send('Server error');
    }
};


exports.getGroups = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM `groups`');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching group data:', error);
        res.status(500).send('Server error');
    }
};


