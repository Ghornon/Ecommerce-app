import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import database from '../database';
import { JWT_SECRET } from '../../config';

// Create token
const signToken = id => JWT.sign({
	iss: 'Ecommerce',
	sub: id,
	iat: new Date().getTime(),
	exo: new Date().setDate(new Date().getDate() + 1),
}, JWT_SECRET);

// Hash pasword
const genHash = async (password) => {
	// Generate a salt
	const salt = await bcrypt.genSalt(10);

	// Generate a hash
	const hash = await bcrypt.hash(password, salt);

	// Retrun hash
	return hash;
};

// Sign in
const signIn = async (req, res) => {
	// Create token
	const token = signToken(req.user_id);

	// Send token
	return res.status(200).json({ token });
};

// Sign up
const signUp = async (req, res) => {
	const {
		email, password, fname, lname,
	} = req.body;

	// Check in database whether email is in use
	const rows = await database.query('SELECT * FROM users WHERE email = ?', [email]);

	if (rows.length > 0) {
		return res.status('409').json({ error: 'Email is already in use!' });
	}

	// Ganerate hash password
	const hash = await genHash(password);

	// Insert data to database
	const result = await database.query('INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)', [email, hash, fname, lname]);

	// Create token
	const token = signToken(result.insertId);

	// Send token
	return res.status(200).json({ token });
};

const secret = async (req, res) => {
	res.status(200).json('Heeelloo!');
};

export default { signIn, signUp, secret };
