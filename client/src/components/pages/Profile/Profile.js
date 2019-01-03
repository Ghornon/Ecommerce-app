import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { ProfileForm, AddressForm, PaymentForm } from './Forms';

import authGuard from '../../helpers/authGuard';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {},
			address: {},
			payment: {}
		};
	}

	componentDidMount() {
		const self = this;
		if (authGuard.isAuthenticated) {
			fetch('/api/users/profile', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			})
				.then(data => (data.ok ? data.json() : {}))
				.then(data => {
					self.setState(state => {
						return {
							...state,
							profile: {
								...data
							}
						};
					});
				});

			fetch('/api/users/address', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			})
				.then(data => (data.ok ? data.json() : {}))
				.then(data => {
					self.setState(state => {
						return {
							...state,
							address: {
								...data
							}
						};
					});
				});

			fetch('/api/users/payment', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			})
				.then(data => (data.ok ? data.json() : {}))
				.then(data => {
					self.setState(state => {
						return {
							...state,
							payment: {
								...data,
								expiration: data.expiration.slice(0, 10)
							}
						};
					});
				});
		}
	}

	render() {
		if (!authGuard.isAuthenticated) {
			return <Redirect to="/" />;
		}

		const navItems = ['Profile', 'Cart', 'Orders'].map(element => {
			return (
				<li className="nav-item" key={element}>
					<Link
						to={`/${element.toLowerCase()}`}
						className="nav-link"
						onClick={this.props.toggleCollapse}
					>
						{element}
					</Link>
				</li>
			);
		});

		const UserNav = withRouter(({ history }) => (
			<ul className="nav">
				<li className="nav-item">
					<h1 className="nav-header-2">Menu</h1>
				</li>
				{navItems}
				<li className="nav-item">
					<Link
						onClick={event => {
							event.preventDefault();
							authGuard.signout(() => {
								this.props.refreshCartCount();
								history.push('/');
							});
						}}
						to="/signout"
						className="nav-link"
					>
						Sign out
					</Link>
				</li>
			</ul>
		));

		return (
			<main className="profile">
				<aside className="sidebar">
					<div className="sidebar-image">
						<img src="/user.png" alt="user" className="img" />
					</div>

					<h2 className="sidebar-name">
						{this.state.profile.fname + ' ' + this.state.profile.lname}
					</h2>

					<hr />

					<UserNav />
				</aside>

				<div className="data">
					<ProfileForm {...this.state.profile} />
					<hr />
					<AddressForm {...this.state.address} />
					<hr />
					<PaymentForm {...this.state.payment} />
				</div>
			</main>
		);
	}
}
