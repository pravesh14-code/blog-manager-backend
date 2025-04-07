const Joi = require('joi');

exports.blogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string()
    .valid('Coding', 'Technology', 'Travel', 'Lifestyle')
    .required(),
  is_public: Joi.boolean().optional(),

  media: Joi.array().items(
    Joi.object({
      media_data: Joi.string().base64().required(),
      media_type: Joi.string().valid('image/png', 'image/jpeg', 'video/mp4').required()
    })
  ).optional()
});

