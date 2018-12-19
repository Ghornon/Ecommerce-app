import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Layout

import Header from './layout/Header';
import Footer from './layout/Footer';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Single from './pages/Single';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Forget from './pages/Forget';

// Helpers
import authGuard from './helpers/authGuard';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authGuard.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
		}
	/>
);

// App Component
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartCount: 0,
			products: [],
			searchQuery: ''
		};
	}

	componentDidMount() {
		this.refreshCartCount();
	}

	refreshCartCount() {
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
					self.setState({ cartCount: data.products.length });
				});
		} else {
			this.setState({ cartCount: 0 });
		}
	}

	search(query) {
		return this.state.products.filter(element => {
			const name = element.name.toLowerCase();
			const regex = new RegExp(query.toLowerCase());
			return regex.test(name);
		});
	}

	setSearchQuery(searchQuery) {
		this.setState({ searchQuery });
	}

	incrementCartCount() {
		if (authGuard.isAuthenticated) this.setState({ cartCount: this.state.cartCount + 1 });
	}

	decrementCartCount() {
		if (authGuard.isAuthenticated) this.setState({ cartCount: this.state.cartCount - 1 });
	}

	getProducts() {
		const self = this;
		fetch('/api/products')
			.then(data => data.json())
			.then(data => {
				console.log(data);
				self.setState({ products: data.products });
			});
	}

	async addProductToCart(id) {
		if (authGuard.isAuthenticated) {
			const result = await fetch(`/api/cart/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			});
			console.log(result);
			if (result.status === 204) this.incrementCartCount();
		}
	}

	render() {
		return (
			<div>
				<Header
					cartCount={this.state.cartCount}
					refreshCartCount={this.refreshCartCount.bind(this)}
					setSearchQuery={this.setSearchQuery.bind(this)}
					searchQuery={this.state.searchQuery}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<Home
							{...props}
							products={this.search(this.state.searchQuery)}
							getProducts={this.getProducts.bind(this)}
							addProductToCart={this.addProductToCart.bind(this)}
							incrementCartCount={this.incrementCartCount.bind(this)}
						/>
					)}
				/>
				<Route exact path="/home" render={props => <Home {...props} />} />
				<PrivateRoute
					exact
					path="/cart"
					component={props => (
						<Cart
							{...props}
							decrementCartCount={this.decrementCartCount.bind(this)}
							incrementCartCount={this.incrementCartCount.bind(this)}
						/>
					)}
				/>
				<Route
					path="/products/:id"
					render={props => (
						<Single {...props} addProductToCart={this.addProductToCart.bind(this)} />
					)}
				/>
				<Route path="/profile" render={props => <Profile {...props} />} />
				<Route path="/signup" render={props => <Signup {...props} />} />
				<Route path="/forget" render={props => <Forget {...props} />} />
				<Footer />
			</div>
		);
	}
}
