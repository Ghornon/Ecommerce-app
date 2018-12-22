import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import ProfileForm from '../layout/profileForm';
import AddressForm from '../layout/addressForm';
import authGuard from '../helpers/authGuard';

export default class Profile extends Component {
	state = {
		profile: {},
		address: {}
	};

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

			/* fetch('/api/users/address', {
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
				}); */

			/* fetch('/api/users/payment', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				}
			})
				.then(data => data.json())
				.then(data => {
					self.setState({ ...self.state, ...data });
				}); */
		}
	}

	render() {
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

		console.log(this.state);

		return (
			<main className="profile">
				<aside className="sidebar">
					<div className="sidebar-image">
						<img src="dist/img/user.png" alt="user" className="img" />
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

					<form action="/users/payment" method="POST" className="form">
						<div className="row">
							<h1 className="header">Payment (Credit card)</h1>
						</div>

						<div className="row">
							<label htmlFor="name" className="form-label">
								Name on card
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="John Smith"
								className="form-input"
							/>
						</div>
						<div className="row-inline">
							<div className="row">
								<label htmlFor="card-number" className="form-label">
									Credit card number
								</label>
								<input
									type="text"
									id="card-number"
									name="card-number"
									placeholder="5500 0000 0000 0004"
									className="form-input"
								/>
							</div>
							<div className="row">
								<label htmlFor="card-expiration" className="form-label">
									Expiration
								</label>
								<input
									type="month"
									id="card-expiration"
									name="card-expiration"
									placeholder="2021-06"
									className="form-input"
									value="2021-06"
								/>
							</div>
						</div>
						<div className="row">
							<label htmlFor="CCV" className="form-label">
								CCV
							</label>
							<input
								type="text"
								id="CCV"
								name="CCV"
								placeholder="123"
								className="form-input"
							/>
						</div>
						<div className="row no-padding">
							<button type="submit" className="btn btn-blue form-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</main>
		);
	}
}
