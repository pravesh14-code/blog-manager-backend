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
            media: { select: { media_data: true } },
            comments: true,
            likes: true,
          },
        },
      },
    }),

  getMyBlogs: (userId) =>
    prisma.blogPost.findMany({
      where: { user_id: userId },
      include: {
        author: { select: { full_name: true, profile_pic: true } }, 
        media: { select: { media_data: true } },
        comments: true,
        likes: true,
      },
      orderBy: { created_at: 'desc' },
    }),

  getById: (id) =>
    prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { full_name: true, profile_pic: true } }, 
        media: { select: { media_data: true } },
        comments: true,
        likes: true,
      },
    }),

  create: (data) => prisma.blogPost.create({ data }),

  update: (id, data) =>
    prisma.blogPost.update({
      where: { id },
      data,
    }),

  remove: (id) => prisma.blogPost.delete({ where: { id } }),

  createMedia: (data) => prisma.postMedia.create({ data }),
};

module.exports = Blog;
