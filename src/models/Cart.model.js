import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },

}, { timestamps: true});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);