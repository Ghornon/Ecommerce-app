import React, { Component } from 'react';
import authGuard from '../helpers/authGuard';

export default class ProfileForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			password: '',
			retype: ''
		};
	}

	// Set state from props when props changed
	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			this.setState({ ...nextProps });
		}
	}

	// Handlres
	inputChangeHandler(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		const self = this;
		if (authGuard.isAuthenticated) {
			fetch('/api/users/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authGuard.token
				},
				body: JSON.stringify({ ...self.state })
			});
		}
	}

	render() {
		console.log(this.state);
		return (
			<form className="form" onSubmit={this.onSubmit.bind(this)}>
				<div className="row">
					<h1 className="header">Personal</h1>
				</div>
				<div className="row">
					<label htmlFor="fname" className="form-label">
						First name
					</label>
					<input
						type="text"
						id="fname"
						name="fname"
						placeholder="John"
						className="form-input"
						value={this.state.fname}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row">
					<label htmlFor="lname" className="form-label">
						Last name
					</label>
					<input
						type="text"
						id="lname"
						name="lname"
						placeholder="Smith"
						className="form-input"
						value={this.state.lname}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row">
					<label htmlFor="email" className="form-label">
						E-mail
					</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="email@example.com"
						className="form-input"
						value={this.state.email}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row">
					<label htmlFor="password" className="form-label">
						Passsword
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="********"
						className="form-input"
						value={this.state.password}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row">
					<label htmlFor="retype" className="form-label">
						Retype
					</label>
					<input
						type="password"
						id="retype"
						name="retype"
						placeholder="********"
						className="form-input"
						value={this.state.retype}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row no-padding">
					<button type="submit" className="btn btn-blue form-btn">
						Submit
					</button>
				</div>
			</form>
		);
	}
}
