import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desription: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdBy :{
        type: String,
        required: true,
    },
    createdById :{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);