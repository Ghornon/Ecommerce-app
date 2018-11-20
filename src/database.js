import mysql from 'mysql';
import config from '../config';

class Database {
	constructor(configObject) {
		this.pool = mysql.createPool(configObject);
	}

	getConnection() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					reject(err);
				}

				resolve(connection);
			});
		});
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.pool.query(sql, args, (error, results, fields) => {
				if (error) {
					return reject(error);
				}
				resolve(results, fields);
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.pool.end((err) => {
				reject(err);
			});
			resolve();
		});
	}
}

const database = new Database(config.DB_CONFIG);

export default database;
