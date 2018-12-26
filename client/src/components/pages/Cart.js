import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authGuard from '../helpers/authGuard';

export default class Cart extends Component {
	state = {
		products: [],
		productsView: []
	};

	createProductsView() {
		const products = this.state.products;
		const count = [];
		const productsArray = [];

		for (let i = 0; i < products.length; i++) {
			let validate = true;
			for (let j = 0; j < count.length; j++) {
				if (count[j].product_id === products[i].product_id) validate = false;
			}
			if (validate) {
				count.push({ product_id: products[i].product_id, count: 1 });
			} else {
				count.map(element => {
					if (element.product_id === products[i].product_id) element.count++;
					return element;
				});
			}
		}

		for (let i = 0; i < products.length; i++) {
			let validate = true;
			for (let j = 0; j < productsArray.length; j++) {
				if (count[j].product_id === products[i].product_id) validate = false;
			}
			if (validate) {
				const a = count.find(element => {
					return element.product_id === products[i].product_id;
				});
				console.log(a);
				productsArray.push({ ...products[i], count: a.count });
			}
		}
		this.setState({ productsView: productsArray });
	}

	componentDidMount() {
		const self = this;
		if (authGuard.isAuthenticated) {
			fetch('/api/cart', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			})
				.then(data => data.json())
				.then(data => {
					self.setState({ products: data.products });
					this.createProductsView();
				});
		}
	}

	async handleDecrement(id, event) {
		fetch(`/api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authGuard.token
			}
		});

		const products = this.state.products.filter(element => element.cart_id !== id);

		console.log(this.state.products, products);

		await this.setState({
			products
		});

		await this.props.decrementCartCount();

		await this.createProductsView();
		event.preventDefault();
	}

	async handleIncrement(id, event) {
		await fetch(`/api/cart/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authGuard.token
			}
		});

		await this.forceUpdate();
		await this.props.incrementCartCount();
		event.preventDefault();
	}

	async handleRemove(id, event) {
		await fetch(`/api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authGuard.token
			}
		});

		const products = this.state.products.filter(element => element.cart_id !== id);

		console.log(this.state.products, products);

		await this.setState({
			products
		});

		await this.props.decrementCartCount();

		await this.createProductsView();
		event.preventDefault();
	}

	checkout(event) {
		event.preventDefault();
		fetch(`/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authGuard.token
			}
		});
	}

	render() {
		const products = this.state.productsView.map((element, index) => {
			const { cart_id, product_id, name, price, svg, count } = element;

			return (
				<li className="nav-item" key={index}>
					<div className="col">
						<img src={svg} alt={name} className="order-image" />
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
							<span
								onClick={this.handleDecrement.bind(this, cart_id)}
								className="btn btn-add btn-step btn-step-minus order-sm"
							>
								<i className="fas fa-minus" />
							</span>
							<input
								type="number"
								id="item-1-count"
								name="fnaitem-1-countme"
								value={count}
								className="form-input order-sm"
							/>
							<span
								onClick={this.handleIncrement.bind(this, product_id)}
								className="btn btn-add btn-step btn-step-plus order-sm"
							>
								<i className="fas fa-plus" />
							</span>
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

		const totalPrice = this.state.productsView.reduce((previousValue, currentValue) => {
			const { price, count } = currentValue;
			return previousValue + price * count;
		}, 0);

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

					<li className="nav-item order-footer">
						<div className="col">
							<form className="form">
								<div className="row-inline">
									<div className="row">
										<label htmlFor="cupone" className="form-label">
											Cupone code
										</label>
										<input
											type="text"
											id="cupone"
											name="cupone"
											placeholder="Cupone code"
											className="form-input"
										/>
									</div>
									<div className="row">
										<button type="submit" className="btn btn-blue form-btn">
											Use
										</button>
									</div>
								</div>
							</form>
						</div>

						<div className="col">
							<h2 className="order-price">
								Total price: <span className="order-count">$ {totalPrice}</span>
							</h2>
							<span onClick={this.checkout.bind(this)} className="btn btn-outline">
								Checkout
							</span>
						</div>
					</li>
				</ul>
			</main>
		);
	}
}
