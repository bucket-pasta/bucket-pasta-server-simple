import express from 'express';
import tabsHandler from '../Controllers/tabs';

// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import tabsValidator from '../validations/tabs';

const tabsRouter = express.Router();

// tabsRouter.get('/', isLoggedInUser.isLoggedIn, tabsHandler.addTabs);

tabsRouter.post('/', isLoggedInUser.isLoggedIn, tabsValidator.addTab, tabsHandler.addTabs);

tabsRouter.delete(
    '/:id',
    isLoggedInUser.isLoggedIn,
    tabsHandler.deleteTabs,
);

tabsRouter.patch('/:id', isLoggedInUser.isLoggedIn, tabsHandler.editTabs);

export default tabsRouter;
