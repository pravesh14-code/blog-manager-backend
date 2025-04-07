const commentService = require('../services/commentService');

exports.getAllByPost = async (req, res, next) => {
  try {
    const comments = await commentService.getAllByPost(req.params.post_id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const comment = await commentService.create({
      post_id: parseInt(req.params.post_id),
      user_id: req.user.id,
      content: req.body.content,
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await commentService.update(parseInt(req.params.id), req.body.content);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await commentService.remove(parseInt(req.params.id));
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};