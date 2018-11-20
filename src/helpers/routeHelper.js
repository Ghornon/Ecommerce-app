import Joi from 'joi';

const validateBody = schema => (req, res, next) => {
	const result = Joi.validate(req.body, schema);

	if (result.error) {
		return res.status(400).json({ errors: result.error.details });
	}

	next();
};

const schemas = {
	authSchema: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};

export { validateBody, schemas };
