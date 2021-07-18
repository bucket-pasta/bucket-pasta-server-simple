const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		tabs: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'tabs',
		}]
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
