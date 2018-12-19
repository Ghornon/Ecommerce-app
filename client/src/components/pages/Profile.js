import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
	render() {
		return (
			<main className="profile">
				<aside className="sidebar">
					<div className="sidebar-image">
						<img src="dist/img/user.png" alt="user" className="img" />
					</div>

					<h2 className="sidebar-name">John Smith</h2>

					<hr />

					<ul className="nav">
						<li className="nav-item">
							<h1 className="nav-header-2">Menu</h1>
						</li>
						<li className="nav-item">
							<Link to="/cart" className="nav-link">
								Cart
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/orders" className="nav-link">
								Orders
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/logout" className="nav-link">
								Log out
							</Link>
						</li>
					</ul>
				</aside>

				<div className="data">
					<form action="/users/profile" method="POST" className="form">
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
								Submit
							</button>
						</div>
					</form>

					<hr />

					<form action="/users/address" method="POST" className="form">
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
								/>
							</div>
						</div>
						<div className="row no-padding">
							<button type="submit" className="btn btn-blue form-btn">
								Save
							</button>
						</div>
					</form>

					<hr />

					<form action="/users/payment" method="POST" className="form">
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
							/>
						</div>
						<div className="row-inline">
							<div className="row">
								<label htmlFor="card-number" className="form-label">
									Credit card number
								</label>
								<input
									type="text"
									id="card-number"
									name="card-number"
									placeholder="5500 0000 0000 0004"
									className="form-input"
								/>
							</div>
							<div className="row">
								<label htmlFor="card-expiration" className="form-label">
									Expiration
								</label>
								<input
									type="month"
									id="card-expiration"
									name="card-expiration"
									placeholder="2021-06"
									className="form-input"
									value="2021-06"
								/>
							</div>
						</div>
						<div className="row">
							<label htmlFor="CCV" className="form-label">
								CCV
							</label>
							<input
								type="text"
								id="CCV"
								name="CCV"
								placeholder="123"
								className="form-input"
							/>
						</div>
						<div className="row no-padding">
							<button type="submit" className="btn btn-blue form-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</main>
		);
	}
}
