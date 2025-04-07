const blogService = require('../services/blogService');
const { blogSchema } = require('../validators/blogValidator');
const formatBlogReturnData = require('../utils/formatBlogReturnData');

exports.getAllPublic = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllPublic();
    const formattedBlogs = formatBlogReturnData(blogs);
    res.json(formattedBlogs);
  } catch (err) {
    next(err);
  }
};

exports.getAllPrivate = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllPrivate(req.user.id);
    const formattedBlogs = formatBlogReturnData(blogs);
    res.json(formattedBlogs);
  } catch (err) {
    next(err);
  }
};

exports.getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getMyBlogs(req.user.id);
    const formattedBlogs = formatBlogReturnData(blogs);
    res.json(formattedBlogs);
  } catch (err) {
    next(err);
  }
};

exports.getAllSaved = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllSaved(req.user.id);
    const formattedBlogs = blogs.map(saved => ({
      ...saved.post,
      user: {
        full_name: saved.post.author.full_name,
        profile_pic: saved.post.author.profile_pic,
      },
      savedAt: formatDate(saved.created_at),  
      commentCount: saved.post.comments.length,
      likeCount: saved.post.likes.length,
    }));
    res.json(formattedBlogs);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const blog = await blogService.getById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { error } = blogSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const blog = await blogService.create({
      ...req.body,
      user_id: req.user.id
    });

    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const blog = await blogService.update(parseInt(req.params.id), req.body);
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await blogService.remove(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
