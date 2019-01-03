import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Layout
import { Header, Footer, Alert } from './layout';

// Pages
import { Home, Cart, Single, Profile, Signup, Forget, Orders, OrdersList } from './pages';

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
			searchQuery: '',
			alertType: 'success',
			alertMessage: 'Welcome',
			alertVisible: false
		};
	}

	componentDidMount() {
		this.refreshCartCount();
	}

	// Cart
	refreshCartCount() {
		if (authGuard.isAuthenticated) {
			const self = this;

			// Get cart count
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

	incrementCartCount() {
		if (authGuard.isAuthenticated) {
			this.setState({ cartCount: this.state.cartCount + 1 });
			this.showAlert('Product count increased!', 'success');
		}
	}

	decrementCartCount() {
		if (authGuard.isAuthenticated) {
			this.setState({ cartCount: this.state.cartCount - 1 });
			this.showAlert('Product count decreased!', 'success');
		}
	}

	addProductToCart(id) {
		if (authGuard.isAuthenticated) {
			const self = this;

			fetch(`/api/cart/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			}).then(data => {
				if (data.status === 204) this.incrementCartCount();
				self.showAlert('Product added to cart!', 'success');
			});
		}
	}

	// Search query
	search(query) {
		return this.state.products.filter(element => {
			const name = element.name.toLowerCase();
			const regex = new RegExp(query.toLowerCase());
			return regex.test(name);
		});
	}

	handleSearchQuery(searchQuery) {
		this.setState({ searchQuery });
	}

	// Products
	getProducts() {
		const self = this;
		fetch('/api/products')
			.then(data => data.json())
			.then(data => {
				console.log(data);
				self.setState({ products: data.products });
			});
	}

	// Alert
	showAlert(message, type) {
		this.setState({ alertType: type, alertMessage: message, alertVisible: true });
		setTimeout(this.hideAlert.bind(this), 1000 * 5);
	}

	hideAlert() {
		this.setState({ alertVisible: false });
	}

	// Render
	render() {
		return (
			<div>
				<Header
					cartCount={this.state.cartCount}
					refreshCartCount={this.refreshCartCount.bind(this)}
					search={this.handleSearchQuery.bind(this)}
					searchQuery={this.state.searchQuery}
					alert={this.showAlert.bind(this)}
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
							alert={this.showAlert.bind(this)}
						/>
					)}
				/>
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
				<PrivateRoute exact path="/orders" component={props => <Orders {...props} />} />
				<PrivateRoute
					path="/order/:id"
					component={props => (
						<OrdersList
							{...props}
							addProductToCart={this.addProductToCart.bind(this)}
							alert={this.showAlert.bind(this)}
						/>
					)}
				/>
				<Route
					path="/products/:id"
					render={props => (
						<Single
							{...props}
							addProductToCart={this.addProductToCart.bind(this)}
							alert={this.showAlert.bind(this)}
						/>
					)}
				/>
				<Route path="/profile" render={props => <Profile {...props} />} />
				<Route
					path="/signup"
					render={props => <Signup {...props} alert={this.showAlert.bind(this)} />}
				/>
				<Route path="/forget" render={props => <Forget {...props} />} />

				<Alert
					message={this.state.alertMessage}
					type={this.state.alertType}
					visible={this.state.alertVisible}
					hide={this.hideAlert.bind(this)}
				/>
				<Footer />
			</div>
		);
	}
}
