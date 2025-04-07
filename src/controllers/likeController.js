const likeService = require('../services/likeService');

exports.toggleLike = async (req, res, next) => {
  try {
    const { user } = req;
    const { post_id } = req.params;

    const existing = await likeService.isLiked(user.id, parseInt(post_id));
    if (existing) {
      await likeService.unlike(user.id, parseInt(post_id));
      return res.json({ liked: false });
    } else {
      await likeService.like(user.id, parseInt(post_id));
      return res.json({ liked: true });
    }
  } catch (err) {
    next(err);
  }
};
