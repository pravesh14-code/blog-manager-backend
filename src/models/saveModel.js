const prisma = require('../config/prisma');

const Save = {
  save: (user_id, post_id) =>
    prisma.savedPost.create({ data: { user_id, post_id } }),

  unsave: (user_id, post_id) =>
    prisma.savedPost.delete({
      where: { user_id_post_id: { user_id, post_id } }
    }),

  isSaved: (user_id, post_id) =>
    prisma.savedPost.findUnique({
      where: { user_id_post_id: { user_id, post_id } }
    }),

  getSavedByUser: (user_id) =>
    prisma.savedPost.findMany({
      where: { user_id },
      include: { post: true }
    }),
};

module.exports = Save;
