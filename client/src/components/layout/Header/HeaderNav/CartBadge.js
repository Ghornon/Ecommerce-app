import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
	return (
		<Link to="/cart" className="shopping-cart">
			<i className="fas fa-shopping-cart" />
			<span className="shopping-cart-badge">{props.count}</span>
		</Link>
	);
};
