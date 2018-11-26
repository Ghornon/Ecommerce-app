import router from 'express-promise-router';
import passport from '../helpers/passport';
import { validateBody, schemas } from '../helpers/validator';
import productsController from '../controllers/products';

// Define a router
const productsRouter = router();

// Routes

productsRouter.route('/')
	.get(productsController.get)
	.post(passport.authenticate('jwt', { session: false }), productsController.add);

productsRouter.route('/:id')
	.get(productsController.get)
	.put(passport.authenticate('jwt', { session: false }), productsController.update)
	.delete(passport.authenticate('jwt', { session: false }), productsController.remove);

export default productsRouter;
