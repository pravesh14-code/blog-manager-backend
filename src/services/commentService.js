const Comment = require('../models/commentModel');

exports.getAllByPost = (post_id) => Comment.getAllByPost(post_id);
exports.create = (data) => Comment.create(data);
exports.update = (id, content) => Comment.update(id, content);
exports.remove = (id) => Comment.remove(id);
