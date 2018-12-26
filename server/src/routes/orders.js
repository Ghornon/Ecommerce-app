import router from 'express-promise-router';
import passport from '../helpers/passport';
import ordersController from '../controllers/orders';

// Define a router
const ordersRouter = router();

// Routes

ordersRouter
	.route('/')
	.get(passport.authenticate('jwt', { session: false }), ordersController.get)
	.post(passport.authenticate('jwt', { session: false }), ordersController.add);

export default ordersRouter;
