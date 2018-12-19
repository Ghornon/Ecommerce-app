import React, { Component } from 'react';

export default class Forget extends Component {
	render() {
		return (
			<main className="prompt">
				<form action="/retype" method="POST" className="form">
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
					<div className="row no-padding">
						<button type="submit" className="btn btn-blue form-btn">
							Submit
						</button>
					</div>
				</form>
			</main>
		);
	}
}
