const express = require('express');
const router = express.Router();
const saveController = require('../controllers/saveController');
const auth = require('../middlewares/authMiddleware');

router.post('/:post_id/toggle', auth, saveController.toggleSave);
router.get('/my-saved', auth, saveController.getSavedPosts);

module.exports = router;
