const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', blogController.getAllPublic);  // Get all public blogs
router.get('/private', authMiddleware, blogController.getAllPrivate);  // Get private blogs for authenticated user
router.get('/myblog', authMiddleware, blogController.getMyBlogs);  // Get my blogs for authenticated user
router.get('/saved', authMiddleware, blogController.getAllSaved);  // Get saved blogs for authenticated user
router.get('/:id', blogController.getById);  // Get blog by ID
router.post('/', authMiddleware, blogController.create);  // Create a new blog
router.put('/:id', authMiddleware, blogController.update);  // Update an existing blog
router.delete('/:id', authMiddleware, blogController.remove);  // Delete a blog

module.exports = router;
