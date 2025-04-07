const Like = require('../models/likeModel');

exports.like = (user_id, post_id) => Like.like(user_id, post_id);
exports.unlike = (user_id, post_id) => Like.unlike(user_id, post_id);
exports.isLiked = (user_id, post_id) => Like.isLiked(user_id, post_id);
exports.count = (post_id) => Like.count(post_id);
