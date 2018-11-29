import database from '../database';

const get = async (req, res) => {
	const { id } = req.params;
	let sql = 'SELECT * FROM products';
	const values = [];

	if (id) {
		sql = 'SELECT * FROM products WHERE product_id = ?';
		values.push(id);
	}

	const products = await database.query(sql, values);

	if (products.length <= 0) {
		return res.status(404).json({ error: 'Products not found!' });
	}

	return res.status(200).json({ products });
};

const add = async (req, res) => {
	const { name, price, description, svg } = req.body;

	await database.query(
		'INSERT INTO products (name, price, description, svg) VALUES (?, ?, ?, ?)',
		[name, price, description, svg]
	);

	return res.status(201).json();
};

const update = async (req, res) => {
	const { id } = req.params;
	const { name, price, description, svg } = req.body;

	await database.query(
		'UPDATE products SET name = ?, price = ?, description = ?, svg = ? WHERE product_id = ?',
		[name, price, description, svg, id]
	);

	return res.status(204).json();
};

const remove = async (req, res) => {
	const { id } = req.params;

	await database.query('DELETE FROM products WHERE product_id = ?', [id]);

	return res.status(200).json();
};

export default {
	get,
	add,
	update,
	remove
};
