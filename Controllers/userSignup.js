import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';

const userSignUp = (req, res, next) => {
	const { username, password } = req.body;
	const query = { username };
	Model.UserModel.findOne(query)
		.then((user) => {
			if (user) {
				if (user.username == username) {
					res.status(400);
					next(new Error('Username Already Taken.'));
				}
			} else {
				bcryptjs.hash(password, 12).then((hashedpassword) => {
					const User = new Model.UserModel({
						username,
						password: hashedpassword,
					});
					User.save()
						.then((SavedUser) => {
							return res.status(200).send({
								Message: 'Account Created Successfully.',
								SavedUser,
							});
						})
						.catch((err) => {
							res.status(500);
							next(
								new Error(
									`Unable to Create User. Please Try later. ${err}`,
								),
							);
						});
				});
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});
};

export default userSignUp;
