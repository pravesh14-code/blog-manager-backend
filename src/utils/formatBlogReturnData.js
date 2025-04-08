const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const formatBlogReturnData = (blogs) => {
  return blogs.map(blog => ({
    id: blog.id,
    user_id: blog.user_id,
    user: {
      full_name: blog.author.full_name,
      profile_pic: blog.author.profile_pic,
    },
    title: blog.title,
    content: blog.content,
    category: blog.category,
    is_public: blog.is_public,
    media: blog.media.map(item => item.media_data),
    created_at: formatDate(blog.created_at),
    commentCount: blog.comments.length,
    likeCount: blog.likes.length,
    savedBy: blog.savedBy || [],
  }));
};

module.exports = formatBlogReturnData;