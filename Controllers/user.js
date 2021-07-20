import status from 'http-status';
import Model from '../Models/Model';

const getUsersObject = (req, res, next) => {
	Model.UserModel.findOne({ _id: req.user._id })
		// .populate({
		// 	path: 'tabs',
		// 	populate: [{ path: 'pasties', select: 'theme content type tags displayName' }],
		// })
		.then(userObject => {
			if (userObject) {
				res.status(200).send({ userObject });
			} else {
				res.status(500);
				next(new Error('User Not Found!'));
			}
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};


const deleteUser = (req, res) => {
	const { id } = req.params;
	Model.UserModel.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(200).send({
				Message: 'User Deleted Successfully.',
			});
		} else {
			res.status(500);
			next(new Error('Internal Server Error!'));
		};
	});
};
// TODO: remove password from returned object
// TODO: remove users ability to arbitrarily change their username/password hash
const editUser = (req, res, next) => {
	const { _id } = req.user;
	const query = { $set: req.body };
	Model.UserModel.find({ _id }).then(users => {
		if (users.length > 0) {
			// users[0].username = req.body.username;
			users[0].tabs = [...req.body.tabs];
			users[0].save().then(updatedUser => {
				updatedUser.password = "This is not the password, no peeking"
				res.status(200).send({ updatedUser });
			}).catch(err => {
				console.log(err);
				res.status(500);
				next(new Error('Internal Server Error!'));
			});
		} else {
			res.status(404);
			next(new Error('User not found!'));
		}
	}).catch(err => {
		res.status(500);
		next(new Error('Internal Server Error!'));
	});
	// Model.UserModel.findByIdAndUpdate(_id, query, { new: true }, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 		res.status(500);
	// 		next(new Error('Internal Server Error!'));
	// 	} else {
	// 		res.status(200).send({
	// 			Message: 'Successfully Updated.',
	// 			result,
	// 		});
	// 	}
	// });
};

export default { getUsersObject, editUser, deleteUser };
