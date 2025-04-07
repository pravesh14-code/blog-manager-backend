const Blog = require('../models/blogModel');

exports.getAllPublic = () => Blog.getAllPublic();
exports.getAllPrivate = (userId) => Blog.getAllPrivate(userId);
exports.getAllSaved = (userId) => Blog.getAllSaved(userId);
exports.getMyBlogs = (userId) => Blog.getMyBlogs(userId);
exports.getById = (id) => Blog.getById(id);

exports.create = async (blogData) => {
  const { media, ...postData } = blogData;

  const post = await Blog.create(postData);

  if (media?.length) {
    for (const item of media) {
      await Blog.createMedia({
        post_id: post.id,
        media_data: item.media_data,
        media_type: item.media_type,
      });
    }
  }

  return post;
};

exports.update = (id, data) => Blog.update(id, data);
exports.remove = (id) => Blog.remove(id);
