import database from '../database';

const signIn = async (req, res) => {
	const { email, password } = req.body;

	await database.query('SELECT * FROM users WHERE email = ?', [email])
		.then((results) => {
			if (results.length <= 0) {
				return res.status(404).json('User not found');
			}
			if (results[0].password === password) {
				return res.status(200).json(`Welcome ${email}`);
			}

			return res.status(404).json('Bad email of password');
		});
};

export default { signIn };
