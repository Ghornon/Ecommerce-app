import router from 'express-promise-router';
import usersController from '../controllers/users';

import { validateBody, schemas } from '../helpers/routeHelper';

// Define a router

const userRouter = router();

// Routes

// userRouter.route('/signup')
// 	.post(usersController.signUp);

userRouter.route('/signin')
	.post(validateBody(schemas.authSchema), usersController.signIn);

// userRouter.route('/profile')
// 	.post(usersController.profile);

// userRouter.route('/address')
// 	.post(usersController.address);

// userRouter.route('/payment')
// 	.post(usersController.payment);

// Export

export default userRouter;
