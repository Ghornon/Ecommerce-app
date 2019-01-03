import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authGuard from '../helpers/authGuard';

export default class Orders extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		};
	}

	componentDidMount() {
		const self = this;
		if (authGuard.isAuthenticated) {
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
	}

	render() {
		if (!authGuard.isAuthenticated) {
			return <Redirect to="/" />;
		}

		const ordersNumbers = [...new Set(this.state.orders.map(item => item.shipping_id))];

		const ordersList = ordersNumbers.map(id => {
			const price = this.state.orders.reduceRight((previousValue, element) => {
				return element.shipping_id === id ? previousValue + element.price : previousValue;
			}, 0);

			const status = this.state.orders.find(element => element.shipping_id === id).status;
			return (
				<li className="nav-item" key={id}>
					<div className="col">
						<h2 className="order-name">
							<Link to={`/order/${id}`} className="order-link">
								Order #{id}
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
