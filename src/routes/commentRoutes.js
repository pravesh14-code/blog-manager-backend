const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/authMiddleware');

router.get('/:post_id', commentController.getAllByPost);
router.post('/:post_id', auth, commentController.create);
router.put('/:id', auth, commentController.update);
router.delete('/:id', auth, commentController.remove);

module.exports = router;
