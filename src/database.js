import mysql from 'mysql';
import { DB_CONFIG } from '../config';

class Database {
	constructor(config) {
		this.pool = mysql.createPool(config);
	}

	getConnection() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((error, connection) => {
				if (error) {
					return reject(error);
				}

				return resolve(connection);
			});
		});
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.pool.query(sql, args, (error, results, fields) => {
				if (error) {
					return reject(error);
				}

				return resolve(results, fields);
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.pool.end((error) => {
				reject(error);
			});
			resolve();
		});
	}
}

const database = new Database(DB_CONFIG);

export default database;
