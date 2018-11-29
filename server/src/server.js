import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import usersRoutes from './routes/users';
import cartRoutes from './routes/cart';
import productsRouter from './routes/products';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productsRouter);

/* eslint no-console: 0 */

const port = process.env.port || 3000;
app.listen(port, () =>
	console.log(chalk.green('[Info]'), `Test app listening on port ${chalk.blue.bold(port)}!`)
);
