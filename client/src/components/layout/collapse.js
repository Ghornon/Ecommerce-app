import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import authGuard from '../helpers/authGuard';
import SignIn from './SignIn';

export default class Collapse extends Component {
	render() {
		const navItems = [
			'Unde, amet!',
			'Quae, dolore!',
			'Dolorem, accusamus!',
			'Ullam, consequatur!',
			'Dolorum, quidem.',
			'Harum, consequuntur.',
			'Nostrum, veniam.',
			'Tenetur, excepturi!',
			'Unde, eos.',
			'Necessitatibus, quod.'
		].map((element, index) => {
			return (
				<li className="nav-item" key={index}>
					<Link to={`/${index}`} className="nav-link">
						{element}
					</Link>
				</li>
			);
		});

		let User = () => (
			<ul className="nav">
				<li className="nav-item">
					<h1 className="nav-header text-center">Sign in</h1>
				</li>
				<li className="nav-item">
					<SignIn refreshCartCount={this.props.refreshCartCount} />
				</li>
			</ul>
		);

		if (authGuard.isAuthenticated) {
			User = withRouter(({ history }) => (
				<ul className="nav">
					<li className="nav-item">
						<h1 className="nav-header">User nav</h1>
					</li>
					<li className="nav-item">
						<Link to="/cart" className="nav-link">
							Cart
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/orders" className="nav-link">
							Orders
						</Link>
					</li>
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
		}

		return (
			<nav className="collapse" id="navbar-collapse">
				<div className="container">
					<ul className="nav">
						<li className="nav-item">
							<h1 className="nav-header">Lorem ipsum</h1>
						</li>
						{navItems}
					</ul>
					<ul className="nav">
						<li className="nav-item">
							<h1 className="nav-header">Lorem ipsum</h1>
						</li>
						{navItems}
					</ul>
					<ul className="nav">
						<li className="nav-item">
							<h1 className="nav-header">Lorem ipsum</h1>
						</li>
						{navItems}
					</ul>
					<User />
				</div>
			</nav>
		);
	}
}
