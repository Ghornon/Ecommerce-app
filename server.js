import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import usersRoutes from './src/routes/users';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);

/* eslint no-console: 0 */

const port = process.env.port || 3000;
app.listen(port, () => console.log(chalk.green('[Info]'), `Test app listening on port ${chalk.blue.bold(port)}!`));
