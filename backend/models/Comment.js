// Import "joi" package - Object schema validation
const Joi = require("joi");

const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'\-()%:/!?]*$/;

const Comment = {
	comment: Joi.object().keys({
		userId: Joi.number().integer().required(),
		content: Joi.string().min(1).max(256).regex(regex),
	}),
};

module.exports = Comment;
