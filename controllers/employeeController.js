const db = require('../models/db');

exports.addEmployee = async (req, res) => {
    const {
        AEM_EN, AEM_EC, AEM_DD_GN, company, AEM_DD_DC, AEM_DD_DN, AEM_DD_DD,
        AEM_DD_SF, AEM_ST, AEM_ET, AEM_DD_EQ, AEM_DP, AEM_DD_EX, AEM_PC, AEM_EY,
        AEM_EM, AEM_DB, AEM_PB, AEM_BG, AEM_DJ, AEM_DD_ET, AEM_DD_ES, AEM_PM,
        AEM_WM, AEM_ES, AEM_ID, AEM_FN, AEM_MN, AEM_RA, AEM_AD, AEM_ADD, AEM_CIT,
        AEM_DIS, AEM_STA, AEM_PIN, AEM_COU, AEM_PA, AEM_PAL, AEM_PALL, AEM_PCIT,
        AEM_PDIS, AEM_PSTA, AEM_PPIN, AEM_PCOU, AEM_CTN, AEM_EMAIL, AEM_AC, AEM_VID,
        AEM_RS, AEM_RL, AEM_RK, AEM_UAN, AEM_LID, AEM_PAS, AEM_ULP, AEM_ALP, AEM_BN,
        AEM_BR, AEM_IFS, AEM_ATN,AEM_PASS,
    } = req.body;

    const employeePhotoPath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const query = `
            INSERT INTO employees (
                employeeName, employeeCode, gender, company, departmentCategory, 
                departmentName, departmentDesignation, shift, shiftStartTime, 
                shiftEndTime, educationalQualification, department, experience, 
                previousCompany, relevantExperienceYears, relevantExperienceMonths, 
                dateOfBirth, placeOfBirth, bloodGroup, dateOfJoining, employmentType, 
                employmentStatus, personalMobile, workMobile, extension, bioMetricID, 
                fatherName, motherName, residentialAddress, addressLine1, addressLine2, 
                city, district, state, pincode, country, permanentAddress, 
                permanentAddressLine1, permanentAddressLine2, permanentCity, 
                permanentDistrict, permanentState, permanentPincode, permanentCountry, 
                contactNumber, email, aadharCard, voterID, recordStatus, recordLocation, 
                remarks, uanNumber, loginID, pass, uanLoginPhone, aadharLinkPhone, 
                bankName, branch, ifscCode, accountNo, pass1, employeePhoto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
        `;

        const values = [
            AEM_EN, AEM_EC, AEM_DD_GN, company, AEM_DD_DC, AEM_DD_DN, AEM_DD_DD,
            AEM_DD_SF, AEM_ST, AEM_ET, AEM_DD_EQ, AEM_DP, AEM_DD_EX, AEM_PC, AEM_EY,
            AEM_EM, AEM_DB, AEM_PB, AEM_BG, AEM_DJ, AEM_DD_ET, AEM_DD_ES, AEM_PM,
            AEM_WM, AEM_ES, AEM_ID, AEM_FN, AEM_MN, AEM_RA, AEM_AD, AEM_ADD, AEM_CIT,
            AEM_DIS, AEM_STA, AEM_PIN, AEM_COU, AEM_PA, AEM_PAL, AEM_PALL, AEM_PCIT,
            AEM_PDIS, AEM_PSTA, AEM_PPIN, AEM_PCOU, AEM_CTN, AEM_EMAIL, AEM_AC, AEM_VID,
            AEM_RS, AEM_RL, AEM_RK, AEM_UAN, AEM_LID, AEM_PAS, AEM_ULP, AEM_ALP, AEM_BN,
            AEM_BR, AEM_IFS, AEM_ATN,AEM_PASS, employeePhotoPath
        ];

        const [result] = await db.query(query, values);

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../ADMIN/employees.html');
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM employees WHERE id = ?', [id]);
        res.status(200).send('Employee deleted successfully');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Server error');
    }
};
