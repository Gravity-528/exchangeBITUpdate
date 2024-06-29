import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    prodType: {
        type: String,
        required: true
    },
    prodList: {
        type: [Schema.Types.ObjectId],
        ref: 'Product',
        required: true
    }
}, {
    timestamps: true
});

export const Category = mongoose.model('Category', categorySchema);