const db = require('../models/db');

exports.addCustomer = async (req, res) => {
    const {
        CAT_DD_AO,CAT_DD_RAT,ACC_ID,CAT_CN,CAT_PACN,CAT_CWS,CAT_CPHN,CAT_FAX,CAT_EM,
        CAT_ACEMLS,CAT_CEONM,CAT_CEOEM,CAT_DD_CT,CAT_DD_OWR,CAT_IND,CAT_EMP,CAT_DD_AMO,
        CAT_AR,CAT_DD_AMO0,CAT_ER,CAT_PCN,CAT_SCN,CAT_PPHN,CAT_SPHN,CAT_PEML,CAT_SEML,
        CAT_DD_PD,CAT_DD_SD,CAT_PRMKS,CAT_SRMKS,CAT_BAN,CAT_AHN,CAT_IFC,CAT_BRN,CAT_SIC,
        CAT_TCS,CAT_PAN,CAT_GV,CAT_CAA,CAT_CAG,CAT_BSR,CAT_SSR,CAT_BCI,CAT_SCI,CAT_BST,
        CAT_SST,CAT_BZP,CAT_SZP,CAT_BC0,CAT_SCO
    } = req.body;

    try {
        const query = `
            INSERT INTO customers (
                account_owner, ratings, company_id, company_name, parent_company_name, website, phone, fax, email, accounts_email,
                ceo_name, ceo_email, company_type, ownership, industry, employees,annual_revenue_name, annual_revenue,expected_revenue_name, expected_revenue,
                primary_contact_name, secondary_contact_name, primary_phone, secondary_phone, primary_email, secondary_email,
                primary_designation, secondary_designation, remarks, secondary_remarks, bank_account_number, account_holder_name,
                ifsc_code, branch_name, sic_code, tcs_tds, company_pan_no, company_gst_vat_no, credit_amount_allowed, credit_age,
                billing_street, shipping_street, billing_city, shipping_city, billing_state, shipping_state, billing_zipcode,
                shipping_zipcode, billing_country, shipping_country
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const values = [
            CAT_DD_AO,CAT_DD_RAT,ACC_ID,CAT_CN,CAT_PACN,CAT_CWS,CAT_CPHN,CAT_FAX,CAT_EM,
            CAT_ACEMLS,CAT_CEONM,CAT_CEOEM,CAT_DD_CT,CAT_DD_OWR,CAT_IND,CAT_EMP,CAT_DD_AMO,
            CAT_AR,CAT_DD_AMO0,CAT_ER,CAT_PCN,CAT_SCN,CAT_PPHN,CAT_SPHN,CAT_PEML,CAT_SEML,
            CAT_DD_PD,CAT_DD_SD,CAT_PRMKS,CAT_SRMKS,CAT_BAN,CAT_AHN,CAT_IFC,CAT_BRN,CAT_SIC,
            CAT_TCS,CAT_PAN,CAT_GV,CAT_CAA,CAT_CAG,CAT_BSR,CAT_SSR,CAT_BCI,CAT_SCI,CAT_BST,
            CAT_SST,CAT_BZP,CAT_SZP,CAT_BC0,CAT_SCO
        ];

        const [result] = await db.query(query, values);

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../ADMIN/customers.html');
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};