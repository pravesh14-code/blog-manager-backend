const express = require('express');
const router = express.Router();

const blogRoutes = require('./blogRoutes');
const authRoutes = require('./authRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');
const saveRoutes = require('./saveRoutes');

router.use('/blogs', blogRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/saves', saveRoutes);

module.exports = router;
