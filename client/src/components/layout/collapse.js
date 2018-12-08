import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
					<ul className="nav">
						<li className="nav-item">
							<h1 className="nav-header text-center">Sign in</h1>
						</li>
						<li className="nav-item">
							<SignIn />
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
