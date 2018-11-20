import router from 'express-promise-router';
import passport from '../helpers/passport';
import { validateBody, schemas } from '../helpers/validator';
import usersController from '../controllers/users';

// Define a router
const userRouter = router();

// Routes
userRouter.route('/signup')
	.post(validateBody(schemas.signUpSchema), usersController.signUp);

userRouter.route('/signin')
	.post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), usersController.signIn);

// userRouter.route('/profile')
// 	.post(usersController.profile);

// userRouter.route('/address')
// 	.post(usersController.address);

// userRouter.route('/payment')
// 	.post(usersController.payment);

userRouter.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), usersController.secret);

// Export
export default userRouter;
