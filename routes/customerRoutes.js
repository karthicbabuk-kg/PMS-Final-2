// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const db = require('../models/db');
const { route } = require('./taskRoutes');

// Route to show the add customer form

// Route to handle form submission
router.post('/add', customerController.addCustomer);

router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customer');
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
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



router.get('/edit/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM customer WHERE CUS_ID = ?', [customerId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'customer not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});


router.put('/putEdit/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const updatedCustomer = req.body;

    console.log('Received data:', updatedCustomer); // Debugging: Log incoming data

    // Update query for the customer table
    const updateQuery = `
        UPDATE customer SET
            Account_Owner = ?,
            Account_Ratings = ?,
            Company_Id = ?,
            Company_Name = ?,
            Parentcompany_Name = ?,
            Website = ?,
            Phone = ?,
            Fax = ?,
            Email = ?,
            Accounts_Email = ?,
            Ceo_Name = ?,
            Ceo_Email = ?,
            Company_Type = ?,
            Ownership = ?,
            Industry = ?,
            Employees = ?,
            Annual_Revenue = ?,
            Expected_Revenue = ?,
            Primary_Contactname = ?,
            Secondary_Contactname = ?,
            Primary_Phone = ?,
            Secondary_Phone = ?,
            Primary_Email = ?,
            Secondary_Email = ?,
            Primary_Designation = ?,
            Secondary_Designaion = ?,
            Primary_Remarks = ?,
            Secondary_Remarks = ?,
            Bank_Accountno = ?,
            Account_Holder = ?,
            Ifsc_Code = ?,
            Branch_Name = ?,
            Sic_Code = ?,
            Tcs_Tds = ?,
            Company_Pan = ?,
            Gst_Vat = ?,
            Credit_Amountallowed = ?,
            Credit_Age = ?,
            Billing_Street = ?,
            Billing_City = ?,
            Billing_State = ?,
            Billing_Zipcode = ?,
            Billing_Country = ?,
            Shipping_Street = ?,
            Shipping_City = ?,
            Shipping_State = ?,
            Shipping_Zipcode = ?,
            Shipping_Country = ?
        WHERE CUS_ID = ?
    `;

    // Collect values from the request body
    const values = [
        updatedCustomer.Account_Owner, updatedCustomer.Rating, updatedCustomer.Customer_ID, updatedCustomer.Customer_Name, 
        updatedCustomer.Parent_Company_Name, updatedCustomer.Website, updatedCustomer.Phone, updatedCustomer.Fax, 
        updatedCustomer.Email, updatedCustomer.Accounts_Email, updatedCustomer.CEO_Name, updatedCustomer.CEO_Email, 
        updatedCustomer.Company_Type, updatedCustomer.Ownership, updatedCustomer.Industry, updatedCustomer.Employees, 
        updatedCustomer.Annual_Revenue, updatedCustomer.Expected_Revenue, updatedCustomer.Primary_Contact_Name, 
        updatedCustomer.Secondary_Contact_Name, updatedCustomer.Primary_Phone, updatedCustomer.Secondary_Phone, 
        updatedCustomer.Primary_Email, updatedCustomer.Secondary_Email, updatedCustomer.Primary_Designation, 
        updatedCustomer.Secondary_Designation, updatedCustomer.Remarks, updatedCustomer.Additional_Remarks, 
        updatedCustomer.Bank_Account_Number, updatedCustomer.Account_Holder_Name, updatedCustomer.IFSC_Code, 
        updatedCustomer.Branch_Name, updatedCustomer.SIC_Code, updatedCustomer.TCS_TDS, updatedCustomer.Company_PAN_No, 
        updatedCustomer.Company_GST_VAT_No, updatedCustomer.Credit_Amount_Allowed, updatedCustomer.Credit_Age, 
        updatedCustomer.Billing_Street, updatedCustomer.Billing_City, updatedCustomer.Billing_State, 
        updatedCustomer.Billing_Zipcode, updatedCustomer.Billing_Country, updatedCustomer.Shipping_Street, 
        updatedCustomer.Shipping_City, updatedCustomer.Shipping_State, updatedCustomer.Shipping_Zipcode, 
        updatedCustomer.Shipping_Country, customerId
    ];

    console.log('Update values:', values); // Debugging: Log the values being passed to the query

    try {
        const result = await db.query(updateQuery, values);
        console.log('Query result:', result); // Debugging: Log the result of the query
        res.status(200).send('Customer details updated successfully');
    } catch (error) {
        console.error('Error updating customer details:', error);
        res.status(500).send('Failed to update customer details');
    }
});

router.get('/getRating', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Ratings'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getComType', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Company Type'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/getOwner', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Ownership'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getIndustry', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Industry'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getAnRev', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Annual Revenue'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getExRev', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Expected Revenue'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getTDS', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'TCS TDS'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getPrimaryD', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Primary Designation'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});
router.get('/getSecondaryD', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT Column_Description FROM final_module WHERE Module='Process Management' AND Sub_Modue='Customer' AND Column_Name = 'Secondary Designation'");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching document types:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


module.exports = router;
