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

router.get('/companies', groupController.getCompanies)
  router.get('/team-leads', groupController.getTeamLeads);
  router.get('/executives', groupController.getExecutives);
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


module.exports = router;