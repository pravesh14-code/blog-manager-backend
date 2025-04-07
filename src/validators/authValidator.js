const Joi = require('joi');

exports.registerSchema = Joi.object({
  full_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile_pic: Joi.string().base64().optional() 
});
