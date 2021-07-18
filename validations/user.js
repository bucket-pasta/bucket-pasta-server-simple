import status from 'http-status';

const userSignup = (req, res, next) => {
	const { password, username } = req.body;

	if (!username || !password) {
		res.status(status.BAD_REQUEST);
		next(new Error('username and password Must be Defined in request body'));
	} else {
		next();
	}
};

const userSignin = (req, res, next) => {
	const { password, username } = req.body;
	if (!username || !password) {
		res.status(status.BAD_REQUEST);
		next(new Error('username, password Must be Defined in request body'));
	} else {
		next();
	}
};

const editUser = (req, res, next) => {
	const { username } = req.body;
	if (!username) {
		res.status(status.BAD_REQUEST);
		next(new Error('username, password Must be Defined in request body'));
	} else {
		next();
	}
};

export default { userSignup, userSignin, editUser };
