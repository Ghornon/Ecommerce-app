import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authGuard from '../helpers/authGuard';

export default class OrdersList extends Component {
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
		const id = parseInt(this.props.match.params.id);
		const orders = this.state.orders.filter(element => element.shipping_id === id);

		const totalPrice = orders.reduceRight(
			(previousValue, element) => previousValue + element.price,
			0
		);

		const ordersList = orders.map((element, index) => {
			return (
				<li className="nav-item" key={index}>
					<div className="col">
						<h2 className="order-name">{element.name}</h2>
					</div>

					<div className="col">
						<h2 className="order-price">
							<span className="order-count">$ {element.price}</span>
						</h2>
					</div>
				</li>
			);
		});

		return (
			<main className="order">
				<ul className="nav">
					<li className="nav-item order-header">
						<h1 className="nav-header">
							<i className="fas fa-shopping-cart" /> Order #{id}
						</h1>
						<h2>
							Total price: <span className="order-count">$ {totalPrice}</span>
						</h2>
					</li>
					{ordersList}
				</ul>
			</main>
		);
	}
}
