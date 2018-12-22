import React, { Component } from 'react';
import authGuard from '../helpers/authGuard';

export default class addressForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props
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
			console.log({ ...self.state });
			fetch('/api/users/address', {
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
		console.log(this.props);
		return (
			<form className="form" onSubmit={this.onSubmit.bind(this)}>
				<div className="row">
					<h1 className="header">Billing address</h1>
				</div>

				<div className="row">
					<label htmlFor="address" className="form-label">
						Address
					</label>
					<input
						type="text"
						id="address"
						name="address"
						placeholder="1234 Main St"
						className="form-input"
						value={this.state.address}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row-inline">
					<div className="row">
						<label htmlFor="country" className="form-label">
							Country
						</label>
						<input
							type="text"
							id="country"
							name="country"
							placeholder="United States"
							className="form-input"
							value={this.state.country}
							onChange={this.inputChangeHandler.bind(this)}
						/>
					</div>
					<div className="row">
						<label htmlFor="state" className="form-label">
							State
						</label>
						<input
							type="text"
							id="state"
							name="state"
							placeholder="California"
							className="form-input"
							value={this.state.state}
							onChange={this.inputChangeHandler.bind(this)}
						/>
					</div>
					<div className="row">
						<label htmlFor="zip" className="form-label">
							Zip code
						</label>
						<input
							type="text"
							id="zip"
							name="zip"
							placeholder="90001"
							className="form-input"
							value={this.state.zip}
							onChange={this.inputChangeHandler.bind(this)}
						/>
					</div>
				</div>
				<div className="row no-padding">
					<button type="submit" className="btn btn-blue form-btn">
						Save
					</button>
				</div>
			</form>
		);
	}
}
