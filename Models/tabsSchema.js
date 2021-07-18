import mongoose from 'mongoose';

const TabsSchema = new mongoose.Schema(
	{
		displayName: String,
		tags: [],
		theme: String,
		type: String,
		pasties: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'pasties',
		}]
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('tabs', TabsSchema);
