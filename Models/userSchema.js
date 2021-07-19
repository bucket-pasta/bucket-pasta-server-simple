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
		// tabsss: [
		// 	{
		// 		displayName: String,
		// 		tags: [],
		// 		theme: String,
		// 		type: String,
		// 		pasties: [
		// 			{
		// 				displayName: String,
		// 				tags: [],
		// 				theme: String,
		// 				type: String,
		// 				content: String
		// 			}
		// 		]
		// 	}
		// ],
		tabs: []
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
