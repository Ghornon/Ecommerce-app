import router from 'express-promise-router';
import passport from '../helpers/passport';
import { validateBody, schemas } from '../helpers/validator';
import cartController from '../controllers/cart';

// Define a router
const cartRouter = router();

// Routes

cartRouter.route('/')
	.get(passport.authenticate('jwt', { session: false }), cartController.get);

cartRouter.route('/:id')
	.post(passport.authenticate('jwt', { session: false }), validateBody(schemas.cartSchema), cartController.add)
	.delete(passport.authenticate('jwt', { session: false }), validateBody(schemas.cartSchema), cartController.remove);

export default cartRouter;
