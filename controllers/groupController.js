const db = require('../models/db');

exports.addGroup = async (req, res) => {
    const {
        GR_GN, GR_COM, GR_DC, GR_DN, GR_DD, GR_SL, GR_SE
    } = req.body;

    try {
        const query = `
            INSERT INTO grp (
                group_name, company, department_category, department_name, 
                department_designation, led, employee
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [GR_GN, GR_COM, GR_DC, GR_DN, GR_DD, GR_SL, GR_SE];

        const [result] = await db.query(query, values);

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../ADMIN/groups.html'); 
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};

// exports.getDepartmentDetails = async (req, res) => {
//     try {
//         const [departmentCategories] = await db.query('SELECT DISTINCT departmentCategory FROM employees');
//         const [departmentNames] = await db.query('SELECT DISTINCT departmentName FROM employees');
//         const [departmentDesignations] = await db.query('SELECT DISTINCT departmentDesignation FROM employees');
//         const [employeeName] = await db.query('SELECT DISTINCT employeeName FROM employees');

//         res.json({
//             departmentCategories,
//             departmentNames,
//             departmentDesignations,
//             employeeName
//         });
//     } catch (error) {
//         console.error('Error fetching department details:', error);
//         res.status(500).send('Server error');
//     }
// };

exports.getGroups = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM `grp`');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching group data:', error);
        res.status(500).send('Server error');
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DISTINCT employeeName FROM employees');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Server error');
    }
};
