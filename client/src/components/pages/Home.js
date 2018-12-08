import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categories from '../layout/categories';

export default class Home extends Component {
	state = {
		products: []
	};

	componentDidMount() {
		const self = this;
		fetch('/api/products')
			.then(data => data.json())
			.then(data => {
				console.log(data);
				self.setState({ products: data.products });
			});

		console.log('home props:', this.props);
	}

	handleOnClick(id, event) {
		console.log(event, id);
		fetch(`/api/cart/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFY29tbWVyY2UiLCJzdWIiOjEsImlhdCI6MTU0MzE0ODM5MzA3OSwiZXhvIjoxNTQzMjM0NzkzMDc5fQ.MGrtksGAN51ZWKjICtjAb_wV4T7IwNcOkJIaowtLsFM'
			}
		});
		event.preventDefault();
		console.log(this.props);
		this.props.incrementCartCount();
	}

	render() {
		const products = this.state.products.map(element => {
			const { product_id, name, price, svg } = element;
			return (
				<li className="product-item" key={product_id}>
					<Link to={`/products/${product_id}`} className="product-img-link">
						<img
							src={`data:image/svg+xml;base64,${svg}`}
							alt={name}
							className="product-img"
						/>
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

		console.log('products', this.state.products);

		return (
			<main className="products">
				<Categories />

				<ul className="product-list">{products}</ul>
			</main>
		);
	}
}
