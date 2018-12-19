class AuthGuard {
	constructor() {
		this.isAuthenticated = false;
		this.token = localStorage.getItem('token');
		if (this.token) this.isAuthenticated = true;
		console.log(this.token, this.isAuthenticated);
	}

	_authenticate(token) {
		this.isAuthenticated = true;
		this.token = token;
		localStorage.setItem('token', token);
	}

	async signin(email, password, callback) {
		const status = await fetch('/api/users/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		}).then(data => {
			if (data.status === 200) return data.json();
			return data;
		});

		if (status.token) {
			this._authenticate(status.token);
			return callback(status);
		}

		console.log(status.statusText);
		return callback(status.statusText);
	}

	signout(callback) {
		this.isAuthenticated = false;
		this.token = null;
		localStorage.removeItem('token');
		callback();
	}
}

const authGuard = new AuthGuard();

export default authGuard;
