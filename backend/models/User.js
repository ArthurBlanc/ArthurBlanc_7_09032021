// Import "joi" package - Object schema validation
const Joi = require("joi");

const nameRegex = /^([A-Za-z][A-Za-z ,.'-]*){1,128}$/;

const User = {
	user: Joi.object().keys({
		prenom: Joi.string().max(128).regex(nameRegex),
		nom: Joi.string().max(128).regex(nameRegex),
		email: Joi.string().max(256),
		password: Joi.string().max(128).allow(null, ""),
		admin: Joi.number().integer().min(0).max(1),
	}),
};

module.exports = User;
