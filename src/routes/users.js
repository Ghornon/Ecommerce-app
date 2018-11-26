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
	.post(passport.authenticate('local', { session: false }), validateBody(schemas.authSchema), usersController.signIn);

userRouter.route('/profile')
	.get(passport.authenticate('jwt', { session: false }), usersController.getProfile)
	.put(passport.authenticate('jwt', { session: false }), validateBody(schemas.profileSchema), usersController.setProfile);

userRouter.route('/address')
	.get(passport.authenticate('jwt', { session: false }), usersController.getAddress)
	.put(passport.authenticate('jwt', { session: false }), validateBody(schemas.addressSchema), usersController.setAddress);

userRouter.route('/payment')
	.get(passport.authenticate('jwt', { session: false }), usersController.getPayments)
	.put(passport.authenticate('jwt', { session: false }), validateBody(schemas.paymentSchema), usersController.setPayments);

// Export
export default userRouter;
