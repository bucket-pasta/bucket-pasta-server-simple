import status from 'http-status';
import Model from '../Models/Model';

const getUsersObject = (req, res) => {
	Model.UserModel.find()
		.populate({
			path: 'tabs',
			populate: [{ path: 'pasties', select: 'theme content type tags displayName' }],
		})
		.then(userObject => {
			res.status(200).send({ userObject });
		})
		.catch(err => {
			res.status(500).send({
				Message: 'No Events!',
				err,
			});
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

const editUser = (req, res) => {
	const { id } = req.params;
	const query = { $set: { username: req.body.username } };
	Model.UserModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
		if (err) {
			res.status(500);
			next(new Error('Internal Server Error!'));
		} else {
			res.status(200).send({
				Message: 'Successfully Updated.',
				result,
			});
		}
	});
};

export default { getUsersObject, editUser, deleteUser };
