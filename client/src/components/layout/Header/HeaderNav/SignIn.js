import React, { Component } from 'react';
import authGuard from '../../../helpers/authGuard';

export default class signIn extends Component {
	handleSubmit(event) {
		const self = this;
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		authGuard.signin(email, password, data => {
			console.log('Sign in...', data);
			if (data.token) {
				self.props.refreshCartCount();
				self.forceUpdate();
			} else self.props.alert('Bad email or password!', 'donger');
		});
	}

	render() {
		return (
			<form className="form" onSubmit={this.handleSubmit.bind(this)}>
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
					/>
				</div>
				<div className="row no-padding">
					<a href="/signup" className="btn btn-blue form-btn">
						Sign up 4 free
					</a>
					<button type="submit" className="btn btn-red form-btn">
						Sign in
					</button>
				</div>
				<div className="row">
					<a href="/forget" className="form-text">
						Forget password?
					</a>
				</div>
			</form>
		);
	}
}
