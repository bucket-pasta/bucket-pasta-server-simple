import express from 'express';
import userHandler from '../Controllers/user';

// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import userValidator from '../validations/user';

const eventRouter = express.Router();

eventRouter.get('/', isLoggedInUser.isLoggedIn, userHandler.getUsersObject);

eventRouter.delete(
	'/:id',
	isLoggedInUser.isLoggedIn,
	userHandler.deleteUser,
);

eventRouter.patch('/:id', isLoggedInUser.isLoggedIn, userValidator.editUser, userHandler.editUser);

export default eventRouter;
