import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authGuard from '../helpers/authGuard';

export default class Orders extends Component {
	state = {
		orders: []
	};

	componentDidMount() {
		const self = this;
		fetch(`/api/orders`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authGuard.token
			}
		})
			.then(data => data.json())
			.then(data => {
				self.setState({ orders: data.orders });
			});
	}

	render() {
		console.log(this.state.orders);
		const ordersList = this.state.orders.map(element => {
			const shoppingId = element.shipping_id;
			const name = element.name;
			const price = element.price;
			const status = element.status;
			return (
				<li className="nav-item">
					<div className="col">
						<h2 className="order-name">
							<Link to="/" className="order-link">
								Order #{shoppingId} - {name}
							</Link>
						</h2>
					</div>

					<div className="col">
						<h2 className="order-price">
							<span className="order-count">$ {price}</span>
						</h2>

						<h2 className="order-status">{status}</h2>
					</div>
				</li>
			);
		});

		return (
			<main className="order">
				<ul className="nav">
					<li className="nav-item order-header">
						<h1 className="nav-header">
							<i className="fas fa-shopping-cart" /> Orders
						</h1>
					</li>
					{ordersList}
				</ul>
			</main>
		);
	}
}
