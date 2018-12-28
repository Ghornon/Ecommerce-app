import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authGuard from '../helpers/authGuard';

export default class Signup extends Component {
	state = {
		redirect: false
	};

	handleOnSubmit(event) {
		event.preventDefault();
		const { email, password, retype, fname, lname } = event.target;
		const self = this;
		authGuard.signup(
			email.value,
			password.value,
			retype.value,
			fname.value,
			lname.value,
			data => {
				if (data.token) {
					self.props.alert('Sign up successful', 'success');
					self.setState({
						redirect: true
					});
				} else {
					self.props.alert(data.message, 'donger');
				}
			}
		);
	}

	render() {
		if (this.state.redirect || authGuard.isAuthenticated) {
			return <Redirect to="/" />;
		}

		return (
			<main className="prompt">
				<form className="form" onSubmit={this.handleOnSubmit.bind(this)}>
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
						/>
					</div>
					<div className="row">
						<label htmlFor="signupemail" className="form-label">
							E-mail
						</label>
						<input
							type="text"
							id="signupemail"
							name="email"
							placeholder="email@example.com"
							className="form-input"
						/>
					</div>
					<div className="row">
						<label htmlFor="signuppassword" className="form-label">
							Passsword
						</label>
						<input
							type="password"
							id="signuppassword"
							name="password"
							placeholder="********"
							className="form-input"
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
						/>
					</div>
					<div className="row no-padding">
						<button type="submit" className="btn btn-blue form-btn">
							Sign up 4 free
						</button>
					</div>
				</form>
			</main>
		);
	}
}
