import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import usersRoutes from './src/routes/users';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);

// Listen
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Test app listening on port ${port}!`));
