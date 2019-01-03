import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Categories } from '../layout';
import authGuard from '../helpers/authGuard';

export default class Home extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	handleOnClick(id, event) {
		event.preventDefault();
		if (authGuard.isAuthenticated) {
			this.props.addProductToCart(id);
		} else {
			this.props.alert('You need to be logged if u want to add product to cart', 'warning');
		}
	}

	render() {
		const products = this.props.products.map(element => {
			const { product_id, name, price, svg } = element;
			return (
				<li className="product-item" key={product_id}>
					<Link to={`/products/${product_id}`} className="product-img-link">
						<img src={svg} alt={name} className="product-img" />
					</Link>

					<h2 className="product-name">
						<Link to={`/products/${product_id}`} className="product-link">
							{name}
						</Link>
					</h2>

					<h3 className="product-price">$ {price}</h3>

					<span
						className="btn btn-add"
						product_id={product_id}
						onClick={this.handleOnClick.bind(this, product_id)}
					>
						<i className="fas fa-plus" />
					</span>
				</li>
			);
		});

		return (
			<main className="products">
				<Categories />

				<ul className="product-list">{products}</ul>
			</main>
		);
	}
}
