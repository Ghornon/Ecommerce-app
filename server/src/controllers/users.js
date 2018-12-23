import { signToken, genHash } from '../helpers/auth';
import database from '../database';

// Sign in
const signIn = async (req, res) => {
	// Create token
	const token = signToken(req.user.user_id);

	// Send token
	return res.status(200).json({ token });
};

// Sign up
const signUp = async (req, res) => {
	const { email, password, fname, lname } = req.body;

	// Check in database whether email is in use
	const rows = await database.query('SELECT * FROM users WHERE email = ?', [email]);

	if (rows.length > 0) {
		return res.status('409').json({ error: 'Email is already in use!' });
	}

	// Ganerate hash password
	const hash = await genHash(password);

	// Insert data to database
	const result = await database.query(
		'INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)',
		[email, hash, fname, lname]
	);

	// Create token
	const token = signToken(result.insertId);

	// Send token
	return res.status(201).json({ token });
};

// User profile controller
const getProfile = async (req, res) => {
	const { email, fname, lname } = req.user;

	res.status(200).json({
		email,
		fname,
		lname
	});
};

const setProfile = async (req, res) => {
	const { email, password, fname, lname } = req.body;
	const id = req.user.user_id;

	// Ganerate hash password
	const hash = await genHash(password);

	// Insert data to database
	await database.query(
		'UPDATE users SET email = ?, password = ?, fname = ?, lname = ? WHERE user_id = ?',
		[email, hash, fname, lname, id]
	);

	// Send result
	return res.status(204).json();
};

// User address controller
const getAddress = async (req, res) => {
	const id = req.user.user_id;

	const result = await database.query('SELECT * FROM address WHERE user_id = ?', [id]);

	if (result.length <= 0) {
		return res.status(404).json();
	}

	const { address, country, state, zip } = result[0];

	// Send result
	return res.status(200).json({
		address,
		country,
		state,
		zip
	});
};

const setAddress = async (req, res) => {
	const { address, country, state, zip } = req.body;
	const id = req.user.user_id;

	const rows = await database.query('SELECT * FROM address WHERE user_id = ?', [id]);

	if (rows.length === 0) {
		await database.query(
			'INSERT INTO address (user_id, address, country, state, zip) VALUES (?, ?, ?, ?, ?)',
			[id, address, country, state, zip]
		);
		return res.status(201).json();
	}

	await database.query(
		'UPDATE address SET address = ?, country = ?, state = ?, zip = ? WHERE user_id = ?',
		[address, country, state, zip, id]
	);
	return res.status(204).json();
};

// User address controller
const getPayments = async (req, res) => {
	const id = req.user.user_id;

	const result = await database.query('SELECT * FROM payments WHERE user_id = ?', [id]);

	if (result.length <= 0) {
		return res.status(404).json();
	}

	const { name, number, expiration, ccv } = result[0];

	// Send result
	return res.status(200).json({
		name,
		number,
		expiration,
		ccv
	});
};

const setPayments = async (req, res) => {
	const { name, number, expiration, ccv } = req.body;
	const id = req.user.user_id;

	const rows = await database.query('SELECT * FROM payments WHERE user_id = ?', [id]);

	if (rows.length === 0) {
		await database.query(
			'INSERT INTO payments (user_id, name, number, expiration, ccv) VALUES (?, ?, ?, ?, ?)',
			[id, name, number, expiration, ccv]
		);
		return res.status(201).json();
	}

	// Insert data to database
	await database.query(
		'UPDATE payments SET name = ?, number = ?, expiration = ?, ccv = ? WHERE user_id = ?',
		[name, number, expiration, ccv, id]
	);

	// Send result
	return res.status(204).json();
};

export default {
	signIn,
	signUp,
	getProfile,
	setProfile,
	getAddress,
	setAddress,
	getPayments,
	setPayments
};
