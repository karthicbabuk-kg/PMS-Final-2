    const db = require('../models/db');

    exports.addCompany = async (req, res) => {
        const {
            CCP_CN, CCP_AID, CCP_PHN, CCP_EMAIL, CCP_WEB, CCP_FAX, CCP_NOE, CCP_AR,
            CCP_DD_AMO, CCP_SKY, CCP_GST, CCP_PAN, CCP_DD_ETAX, CCP_DD_ETDS,
            CCP_BKN, CCP_BRN, CCP_CRN, CCP_ACTNO, IFSC, CCP_DNO, CCP_STR,
            CCP_CIT, CCP_STA, CCP_ZIP, CCP_COU, CCP_DES
        } = req.body;

        const logoPath = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const [result] = await db.query(
                `INSERT INTO companies (company_name, account_id, phone, email, website, fax, no_of_employees, 
                annual_revenue, revenue_currency, skype_id, gst_no, pan_no, enable_tax, enable_tds, 
                bank_name, branch_name, crn_id, account_no, ifsc_code, door_no, street, city, 
                state, zipcode, country, description, logo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    CCP_CN, CCP_AID, CCP_PHN, CCP_EMAIL, CCP_WEB, CCP_FAX, CCP_NOE, CCP_AR,
                    CCP_DD_AMO, CCP_SKY, CCP_GST, CCP_PAN, CCP_DD_ETAX, CCP_DD_ETDS, CCP_BKN,
                    CCP_BRN, CCP_CRN, CCP_ACTNO, IFSC, CCP_DNO, CCP_STR, CCP_CIT, CCP_STA,
                    CCP_ZIP, CCP_COU, CCP_DES, logoPath
                ]
            );

            console.log("Insert Result: ", JSON.stringify(result));
            res.redirect('../ADMIN/company.html'); // Redirect to the company after successful insert
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).send('Server error');
        }
    };
