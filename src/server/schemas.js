const Joi = require('joi');

module.exports.userSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(64),
}).required();
