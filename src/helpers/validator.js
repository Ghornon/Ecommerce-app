import Joi from 'joi';

const validateBody = schema => (req, res, next) => {
	const result = Joi.validate(req.body, schema);

	if (result.error) {
		return res.status(400).json({ error: result.error.details });
	}

	return next();
};

const schemas = {
	authSchema: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	signUpSchema: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		retype: Joi.string().valid(Joi.ref('password')).required(),
		fname: Joi.string().min(3).alphanum(),
		lname: Joi.string().min(3).alphanum(),
	}),
};

export { validateBody, schemas };
