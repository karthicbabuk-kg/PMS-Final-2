const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const db = require('../models/db');



router.post('/add',groupController.addGroup);

// router.get('/get', async (req, res) => {
//     try {
//         const [group] = await db.query('SELECT * FROM grp');
//         res.json(group);
//     } catch (error) {
//         console.error('Database fetch error:', error);
//         res.status(500).send('Server error');
//     }
// });

router.get('/companies', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT DISTINCT company_name FROM companies');
      res.json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  router.get('/dept', async (req,res)=>{
    try {
        const [departmentCategories] = await db.query('SELECT DISTINCT departmentCategory FROM employees');
        const [departmentNames] = await db.query('SELECT DISTINCT departmentName FROM employees');
        const [departmentDesignations] = await db.query('SELECT DISTINCT departmentDesignation FROM employees');

        res.json({
            departmentCategories,
            departmentNames,
            departmentDesignations
        });
    } catch (error) {
        console.error('Error fetching department details:', error);
        res.status(500).send('Server error');
    }
  });
  router.get('/employees', groupController.getEmployees);
  router.get('/get', groupController.getGroups);

  router.delete('/delete/:id', async (req, res) => {
    const groupId = req.params.id;

    try {
        const result = await db.query('DELETE FROM `grp` WHERE id = ?', [groupId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;