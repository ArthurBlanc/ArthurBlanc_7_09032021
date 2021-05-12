// Import "joi" package - Object schema validation
const Joi = require("joi");

const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'\-()%:/!?]*$/;

const Post = {
	post: Joi.object().keys({
		userId: Joi.number().integer(),
		content: Joi.string().min(3).max(512).regex(regex).allow(null, ""),
		categoryId: Joi.number().integer().min(1).max(2),
		postId: Joi.number().integer(),
	}),
};

module.exports = Post;
