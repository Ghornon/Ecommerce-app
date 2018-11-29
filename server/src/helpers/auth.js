import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../../config';

// Create token
const signToken = id =>
	JWT.sign(
		{
			iss: 'Ecommerce',
			sub: id,
			iat: new Date().getTime(),
			exo: new Date().setDate(new Date().getDate() + 1)
		},
		JWT_SECRET
	);

// Hash pasword
const genHash = async password => {
	// Generate a salt
	const salt = await bcrypt.genSalt(10);

	// Generate a hash
	const hash = await bcrypt.hash(password, salt);

	// Retrun hash
	return hash;
};

export { signToken, genHash };
