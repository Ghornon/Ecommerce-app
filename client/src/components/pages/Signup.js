import React, { Component } from 'react';

export default class Signup extends Component {
	render() {
		return (
			<main className="prompt">
				<form action="/signup" method="POST" className="form">
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
