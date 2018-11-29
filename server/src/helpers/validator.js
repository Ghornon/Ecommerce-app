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
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required()
	}),
	signUpSchema: Joi.object().keys({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
		retype: Joi.string()
			.valid(Joi.ref('password'))
			.required(),
		fname: Joi.string()
			.min(3)
			.alphanum(),
		lname: Joi.string()
			.min(3)
			.alphanum()
	}),
	profileSchema: Joi.object().keys({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
		retype: Joi.string()
			.valid(Joi.ref('password'))
			.required(),
		fname: Joi.string()
			.min(3)
			.alphanum(),
		lname: Joi.string()
			.min(3)
			.alphanum()
	}),
	addressSchema: Joi.object().keys({
		address: Joi.string(),
		country: Joi.string(),
		state: Joi.string(),
		zip: Joi.number()
			.integer()
			.positive()
	}),
	paymentSchema: Joi.object().keys({
		name: Joi.string()
			.min(3)
			.alphanum(),
		number: Joi.number()
			.integer()
			.positive(),
		expiration: Joi.date(),
		ccv: Joi.number()
			.min(100)
			.max(999)
			.positive()
	}),
	cartSchema: Joi.object().keys({
		id: Joi.number()
			.integer()
			.positive()
	})
};

export { validateBody, schemas };
