import express from 'express';
import userHandler from '../Controllers/user';

// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const eventRouter = express.Router();

eventRouter.get('/', isLoggedInUser.isLoggedIn, userHandler.getUsersObject);

eventRouter.delete(
	'/:id',
	isLoggedInUser.isLoggedIn,
	userHandler.deleteUser,
);

eventRouter.patch('/', isLoggedInUser.isLoggedIn, userHandler.editUser);

export default eventRouter;
