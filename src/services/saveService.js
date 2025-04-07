const Save = require('../models/saveModel');

exports.toggleSave = async (user_id, post_id) => {
  const exists = await Save.isSaved(user_id, post_id);
  if (exists) {
    await Save.unsave(user_id, post_id);
    return { saved: false };
  } else {
    await Save.save(user_id, post_id);
    return { saved: true };
  }
};

exports.getUserSaves = (user_id) => Save.getSavedByUser(user_id);
