import React, { Component } from 'react';

export default class singIn extends Component {
	render() {
		return (
			<form className="form">
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
