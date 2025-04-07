const prisma = require('../config/prisma');

const Like = {
  like: (user_id, post_id) =>
    prisma.postLike.create({
      data: { user_id, post_id }
    }),

  unlike: (user_id, post_id) =>
    prisma.postLike.delete({
      where: { user_id_post_id: { user_id, post_id } }
    }),

  isLiked: (user_id, post_id) =>
    prisma.postLike.findUnique({
      where: { user_id_post_id: { user_id, post_id } }
    }),

  count: (post_id) =>
    prisma.postLike.count({ where: { post_id } }),
};

module.exports = Like;
