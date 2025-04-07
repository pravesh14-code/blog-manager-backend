const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const auth = require('../middlewares/authMiddleware');

router.post('/:post_id/toggle', auth, likeController.toggleLike);

module.exports = router;
