const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController')
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

router.use(authController.ensureAuthenticated);
router.get('/companies', groupController.getCompanies)
  router.get('/team-leads', groupController.getTeamLeads);
  router.get('/executives', groupController.getExecutives);
  router.get('/getbyTL', groupController.getGroupsByTeamLead);
  router.get('/get', groupController.getGroups);

  router.delete('/delete/:id', async (req, res) => {
    const groupId = req.params.id;

    try {
        const result = await db.query('DELETE FROM `groups` WHERE GRP_ID  = ?', [groupId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Database delete error:', error);
        res.status(500).send('Server error');
    }
});




// edit page

router.get('/edit/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const query = 'SELECT * FROM groups WHERE GRP_ID = ?';

    db.query(query, [groupId], (err, results) => {
        if (err) {
            console.error('Error fetching group details:', err);
            res.status(500).send('Error fetching group details');
            return;
        }
        res.json(results[0]);
    });
});

router.put('/putEdit/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const updatedGroup = req.body;

    const query = `
        UPDATE groups SET
        Group_Name = ?, Company = ?, Select_Lead = ?, Select_Employee = ?
        WHERE GRP_ID = ?
    `;

    db.query(query, [
        updatedGroup.Group_Name,
        updatedGroup.Lead,
        updatedGroup.Employee,
        updatedGroup.Status,
        groupId
    ], (err, results) => {
        if (err) {
            console.error('Error updating group details:', err);
            res.status(500).send('Error updating group details');
            return;
        }
        res.send('Group details updated successfully');
    });
});

module.exports = router;