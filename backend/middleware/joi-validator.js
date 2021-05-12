// Import "FS" package - File management
const fs = require("fs");

const joiValidator = (schema, property) => {
	return (req, res, next) => {
		const { error } = schema.validate(req[property]);

		const valid = error == null;
		if (valid) {
			next();
		} else {
			const { details } = error;
			const message = details.map((i) => i.message).join(",");
			console.log("error", message);
			// Remove image send by multer if form isn't validated
			if (req.file) {
				fs.unlink(`../frontend/public/images/uploads/${req.file.filename}`, (err) => {
					if (err) console.log(err);
				});
			}

			res.status(422).json({
				error: message,
			});
		}
	};
};

module.exports = joiValidator;
