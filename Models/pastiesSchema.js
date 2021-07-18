import mongoose from 'mongoose';

const PastiesSchema = new mongoose.Schema(
    {
        displayName: String,
        tags: [],
        theme: String,
        type: String,
        content: String
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('pasties', PastiesSchema);
