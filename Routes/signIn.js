import express from 'express';
import userSignIn from '../Controllers/userSignin';
import userValidator from '../validations/user';

const signInRouter = express.Router();

signInRouter.post('/', userValidator.userSignin, userSignIn);

export default signInRouter;
