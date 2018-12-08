import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Collapse from './collapse';
import Cart from './cart';

export default class Header extends Component {
	render() {
		return (
			<header className="navbar">
				<input type="checkbox" id="nav-collapse-btn" className="navbar-btn" />

				<label htmlFor="nav-collapse-btn" className="navbar-hamburger">
					<i className="fas fa-bars" />
				</label>

				<Collapse />

				<Link to="/">
					<div className="navbar-brand">
						<i className="fas fa-comment-dollar" />
						<h1 className="navbar-header">Ecommerce</h1>
					</div>
				</Link>

				<div className="navbar-nav">
					<Cart count={this.props.cartCount} />

					<div className="search">
						<input
							type="search"
							className="search-box"
							placeholder="Search..."
							id="search-box"
						/>
						<div className="search-bar" />
					</div>
				</div>
			</header>
		);
	}
}
