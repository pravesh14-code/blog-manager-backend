const saveService = require('../services/saveService');

exports.toggleSave = async (req, res, next) => {
  try {
    const { user } = req;
    const { post_id } = req.params;
    const result = await saveService.toggleSave(user.id, parseInt(post_id));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSavedPosts = async (req, res, next) => {
  try {
    const saved = await saveService.getUserSaves(req.user.id);
    res.json(saved);
  } catch (err) {
    next(err);
  }
};
