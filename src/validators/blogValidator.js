const Joi = require('joi');

exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string()
    .valid('Coding', 'Technology', 'Travel', 'Lifestyle')
    .required(),
  is_public: Joi.boolean().optional(),

  media: Joi.array().items(
    Joi.object({
      id: Joi.number().optional(),
      media_data: Joi.string().uri().required(),
      media_type: Joi.string().required(),
    })
  ).optional()
});

