import React, { Component } from 'react';
import authGuard from '../../../helpers/authGuard';

export default class PaymentForm extends Component {
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
			fetch('/api/users/payment', {
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
		return (
			<form className="form" onSubmit={this.onSubmit.bind(this)}>
				<div className="row">
					<h1 className="header">Payment (Credit card)</h1>
				</div>

				<div className="row">
					<label htmlFor="name" className="form-label">
						Name on card
					</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="John Smith"
						className="form-input"
						value={this.state.name}
						onChange={this.inputChangeHandler.bind(this)}
					/>
				</div>
				<div className="row-inline">
					<div className="row">
						<label htmlFor="number" className="form-label">
							Credit card number
						</label>
						<input
							type="text"
							id="number"
							name="number"
							placeholder="5500 0000 0000 0004"
							className="form-input"
							value={this.state.number}
							onChange={this.inputChangeHandler.bind(this)}
						/>
					</div>
					<div className="row">
						<label htmlFor="expiration" className="form-label">
							Expiration
						</label>
						<input
							type="date"
							id="expiration"
							name="expiration"
							placeholder="2021-06"
							className="form-input"
							value={this.state.expiration}
							onChange={this.inputChangeHandler.bind(this)}
						/>
					</div>
				</div>
				<div className="row">
					<label htmlFor="ccv" className="form-label">
						CCV
					</label>
					<input
						type="text"
						id="ccv"
						name="ccv"
						placeholder="123"
						className="form-input"
						value={this.state.ccv}
						onChange={this.inputChangeHandler.bind(this)}
					/>
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
