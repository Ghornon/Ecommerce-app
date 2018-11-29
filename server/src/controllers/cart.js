import database from '../database';

const get = async (req, res) => {
	const id = req.user.user_id;

	const products = await database.query(
		'SELECT carts.cart_id, products.product_id, products.name, products.price, products.svg FROM carts, products WHERE user_id = ? AND carts.product_id = products.product_id',
		[id]
	);

	if (products.length > 0) {
		return res.status(200).json({ products });
	}

	return res.status(404).json({ products });
};

const add = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.user_id;

	const product = await database.query('SELECT * FROM products WHERE product_id = ?', [id]);

	if (product.length <= 0) {
		return res.status(404).json({ result: 'Bad product id!' });
	}

	await database.query('INSERT INTO carts (user_id, product_id) VALUES (?, ?)', [userId, id]);

	return res.status(204).json();
};

const remove = async (req, res) => {
	const { id } = req.params;

	await database.query('DELETE FROM carts WHERE cart_id = ?', [id]);

	return res.status(200).json();
};

export default { get, add, remove };
