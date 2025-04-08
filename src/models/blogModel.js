const prisma = require('../config/prisma');

const Blog = {
  getAllPublic: () =>
    prisma.blogPost.findMany({
      where: { is_public: true },
      include: {
        author: { select: { full_name: true, profile_pic: true } },
        media: { select: { media_data: true } },
        comments: true,
        likes: true,
        savedBy: true, 
      },
      orderBy: { created_at: 'desc' },
    }),

  getAllPrivate: (userId) =>
    prisma.blogPost.findMany({
      where: { is_public: false, user_id: userId },
      include: {
        author: { select: { full_name: true, profile_pic: true } },
        media: { select: { media_data: true } },
        comments: true,
        likes: true,
        savedBy: true,
      },
      orderBy: { created_at: 'desc' },
    }),

  getAllSaved: (userId) =>
    prisma.savedPost.findMany({
      where: { user_id: userId },
      include: {
        post: {
          include: {
            author: { select: { full_name: true, profile_pic: true } },
            media: { select: { media_data: true, media_type: true } },
            comments: true,
            likes: true,
            savedBy: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    }),

  getMyBlogs: (userId) =>
    prisma.blogPost.findMany({
      where: { user_id: userId },
      include: {
        author: { select: { full_name: true, profile_pic: true } },
        media: { select: { media_data: true } },
        comments: true,
        likes: true,
        savedBy: true,
      },
      orderBy: { created_at: 'desc' },
    }),

  getById: (id) =>
    prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { full_name: true, profile_pic: true } },
        media: { select: { id: true, media_data: true } },
        comments: {
          include: {
            author: { select: { full_name: true, profile_pic: true } },
          },
        },
        likes: true,
        savedBy: true,
      },
    }),

  create: (data) => prisma.blogPost.create({ data }),

  update: (id, data) =>
    prisma.blogPost.update({ where: { id }, data }),

  remove: async (id) => {
    // Delete related entities first (in order)
    await prisma.postLike.deleteMany({ where: { post_id: id } });
    await prisma.savedPost.deleteMany({ where: { post_id: id } });
    await prisma.comment.deleteMany({ where: { post_id: id } });
    await prisma.postMedia.deleteMany({ where: { post_id: id } });
  
    return prisma.blogPost.delete({ where: { id } });
  },

  createMedia: (data) => prisma.postMedia.create({ data }),

  updateMedia: ({ id, media_data, media_type }) =>
    prisma.postMedia.update({ where: { id }, data: { media_data, media_type } }),
};

module.exports = Blog;