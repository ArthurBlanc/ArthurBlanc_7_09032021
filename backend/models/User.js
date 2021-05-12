// Import "joi" package - Object schema validation
const Joi = require("joi");

const nameRegex = /^([A-Za-z][A-Za-z ,.'-]*){1,128}$/;
const emailRegex = /(?=^.{5,256}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;

const User = {
	user: Joi.object().keys({
		prenom: Joi.string().max(128).regex(nameRegex),
		nom: Joi.string().max(128).regex(nameRegex),
		email: Joi.string().min(5).max(256).regex(emailRegex),
		password: Joi.string().max(128).allow(null, ""),
		admin: Joi.number().integer().min(0).max(1),
	}),
};

module.exports = User;
