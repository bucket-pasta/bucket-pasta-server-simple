import express from 'express';
import pastiesHandler from '../Controllers/pasties';

// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import pastiesValidator from '../validations/pasties';

const pastiesRouter = express.Router();

pastiesRouter.post('/', isLoggedInUser.isLoggedIn, pastiesValidator.addPasties, pastiesHandler.addPasties);

pastiesRouter.delete(
    '/:id',
    isLoggedInUser.isLoggedIn,
    pastiesHandler.deletePasties
);

pastiesRouter.patch('/:id', isLoggedInUser.isLoggedIn, pastiesHandler.editPasties);

export default pastiesRouter;
