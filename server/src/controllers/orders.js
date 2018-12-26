import database from '../database';

const registerShipping = async userId => {
	const shipping = await database.query(
		'INSERT INTO shipping (user_id, status_id) VALUES (?, 1)',
		[userId]
	);

	return shipping.insertId;
};

const getCart = async userID => {
	const products = await database.query(
		'SELECT carts.cart_id, products.product_id FROM carts, products WHERE user_id = ? AND carts.product_id = products.product_id',
		[userID]
	);

	return products;
};

const get = async (req, res) => {
	const id = req.user.user_id;

	const orders = await database.query(
		'SELECT shipping.shipping_id, products.name, products.price, products.svg, statuses.status FROM shipping, orders, products, statuses WHERE user_id = ? AND orders.shipping_id = shipping.shipping_id AND products.product_id = orders.product_id AND shipping.status_id = statuses.status_id',
		[id]
	);

	if (orders.length > 0) {
		return res.status(200).json({ orders });
	}

	return res.status(404).json();
};

const add = async (req, res) => {
	const userId = req.user.user_id;
	const cartProducts = await getCart(userId);

	if (cartProducts.length <= 0) {
		return res.status('404').json({ error: 'Your cart is empty!' });
	}

	const shippingId = await registerShipping(userId);

	const orders = cartProducts.map(element => {
		const productId = element.product_id;
		return [shippingId, productId];
	});

	await database.query('INSERT INTO orders (shipping_id, product_id) VALUES ?', [orders]);
	await database.query('DELETE FROM `carts` WHERE user_id =  ?', [userId]);

	return res.status(204).json();
};

export default { get, add };
