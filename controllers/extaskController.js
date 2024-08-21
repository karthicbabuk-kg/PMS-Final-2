const taskModel = require('../models/extaskModel');

exports.addTask = async (req, res) => {
    const {
        ATK_DD_CMP, ATK_TN, ATK_DD_FILE, CCP_REM, ATK_DD_STA, CCP_DES
    } = req.body;

    const taskData = {
        companyName: ATK_DD_CMP,
        taskName: ATK_TN,
        file: ATK_DD_FILE,
        remarks: CCP_REM,
        status: ATK_DD_STA,
        description: CCP_DES,
    };

    try {
        await taskModel.addTask(taskData);
        res.redirect('../EXECUTIVE/uploadtask.html'); // Redirect after successful insertion
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send('Server error');
    }
};

exports.getexecutiveDetail = async (req, res) => {
    try {
        const [executiveName] = await db.query('SELECT employee FROM groups');
        const [conpanyName] = await db.query('SELECT company FROM upload_task');
        const [file] = await db.query('SELECT file FROM upload_task');
        const [remarks] = await db.query('SELECT remarks FROM upload_task');
        const [status] = await db.query('SELECT status FROM upload_task');

        res.json({
            executiveName,
            conpanyName,
            file,
            remarks,
            status
        });
    } catch (error) {
        console.error('Error fetching department details:', error);
        res.status(500).send('Server error');
    }
};



