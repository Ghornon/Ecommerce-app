import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
	state = {
		products: []
	};
	componentDidMount() {
		const self = this;
		fetch('/api/cart', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFY29tbWVyY2UiLCJzdWIiOjEsImlhdCI6MTU0MzE0ODM5MzA3OSwiZXhvIjoxNTQzMjM0NzkzMDc5fQ.MGrtksGAN51ZWKjICtjAb_wV4T7IwNcOkJIaowtLsFM'
			}
		})
			.then(data => data.json())
			.then(data => {
				self.setState({ products: data.products });
				console.log(data.products);
			});
	}

	handleRemove(id, event) {
		fetch(`/api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFY29tbWVyY2UiLCJzdWIiOjEsImlhdCI6MTU0MzE0ODM5MzA3OSwiZXhvIjoxNTQzMjM0NzkzMDc5fQ.MGrtksGAN51ZWKjICtjAb_wV4T7IwNcOkJIaowtLsFM'
			}
		});

		const products = this.state.products.filter(element => element.cart_id !== id);

		console.log(this.state.products, products);

		this.setState({
			products
		});

		this.props.decrementCartCount();
		event.preventDefault();
	}
	render() {
		const products = this.state.products.map(element => {
			const { cart_id, product_id, name, price, svg } = element;

			return (
				<li className="nav-item">
					<div className="col">
						<img
							src={`data:image/svg+xml;base64,${svg}`}
							alt={name}
							className="order-image"
						/>
						<h2 className="order-name">
							<Link to={`/products/${product_id}`} className="order-link">
								{name}
							</Link>
						</h2>
					</div>

					<div className="col">
						<h2 className="order-price">
							$ {price} <span className="order-multiple">x</span>
						</h2>

						<div className="col-inline">
							<Link to="" className="btn btn-add btn-step btn-step-minus order-sm">
								<i className="fas fa-minus" />
							</Link>
							<input
								type="number"
								id="item-1-count"
								name="fnaitem-1-countme"
								value="1"
								className="form-input order-sm"
							/>
							<Link to="" className="btn btn-add btn-step btn-step-plus order-sm">
								<i className="fas fa-plus" />
							</Link>
						</div>

						<span
							className="btn btn-red order-sm order-delete"
							onClick={this.handleRemove.bind(this, cart_id)}
						>
							<i className="fas fa-trash-alt" />
						</span>
					</div>
				</li>
			);
		});

		return (
			<main className="order">
				<ul className="nav">
					<li className="nav-item order-header">
						<h1 className="nav-header">
							<i className="fas fa-shopping-cart" /> Cart
						</h1>
						<Link to="/" className="btn btn-outline">
							Continiu shopping
						</Link>
					</li>

					{products}
				</ul>
			</main>
		);
	}
}
