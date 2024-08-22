const db = require('../models/db')

exports.addTask = async (req, res) => {
    const {
         ATK_DD_EXE1, CMP_ID1, ATK_DD_CMP1, DCT1, DOCN1,TSN1,TSD1,REM1,ATK_DD_STA1
    } = req.body;

    // Multer stores the file path in `req.file` if a file is uploaded
    const DURL1 = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const [result] = await db.query(
            `INSERT INTO upload_task ( Executive_Name, Company_Id, Company_Name, Document_Type, Document_Name, Doument_URL, Task_Name,Task_Details,Remarks,Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
            [
                 ATK_DD_EXE1, CMP_ID1, ATK_DD_CMP1, DCT1, DOCN1, DURL1,TSN1,TSD1,REM1,ATK_DD_STA1
            ]
        );

        console.log("Insert Result: ", JSON.stringify(result));
        res.redirect('../EXECUTIVE/addtask.html');
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};

exports.getexecutiveDetail = async (req, res) => {
     try {
        // Fetch data from the assign_task table
        const [rows] = await db.query(`
            SELECT Company_Name, Task_Name, Document_Name, Remarks, Status 
            FROM assign_task
        `);

        res.json(rows); // Return data as JSON
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM upload_task');
        res.json(rows);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
};



