import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Layout

import Header from './layout/Header';
import Footer from './layout/Footer';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Single from './pages/Single';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartCount: 1
		};
	}

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
				self.setState({ cartCount: data.products.length });
			});
	}

	incrementCartCount() {
		this.setState({ cartCount: this.state.cartCount + 1 });
	}

	decrementCartCount() {
		this.setState({ cartCount: this.state.cartCount - 1 });
	}

	render() {
		return (
			<div>
				<Header cartCount={this.state.cartCount} />
				<Route
					exact
					path="/"
					render={props => (
						<Home {...props} incrementCartCount={this.incrementCartCount.bind(this)} />
					)}
				/>
				<Route exact path="/home" render={props => <Home {...props} />} />
				<Route
					exact
					path="/cart"
					render={props => (
						<Cart {...props} decrementCartCount={this.decrementCartCount.bind(this)} />
					)}
				/>
				<Route path="/products/:id" render={props => <Single {...props} />} />
				<Footer />
			</div>
		);
	}
}
