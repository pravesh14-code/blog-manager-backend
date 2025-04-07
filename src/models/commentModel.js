const prisma = require('../config/prisma');

const Comment = {
  getAllByPost: (post_id) =>
    prisma.comment.findMany({
      where: { post_id },
      include: { author: true },
      orderBy: { created_at: 'asc' }
    }),

  create: (data) => prisma.comment.create({ data }),

  update: (id, content) =>
    prisma.comment.update({
      where: { id },
      data: { content }
    }),

  remove: (id) => prisma.comment.delete({ where: { id } }),
};

module.exports = Comment;
