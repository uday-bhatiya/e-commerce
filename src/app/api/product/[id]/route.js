import { NextResponse } from "next/server";
import ProductModel from "../../../../models/product.model.js";
import connectDb from "../../../../lib/mongoose.js";

export async function GET(req, { params }) {

    const { id } = await params;

    await connectDb();

    try {
        const response = await ProductModel.findById(id).populate({
            path: 'createdById'
        });
        if (!response) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch products"
            })
        }

        return NextResponse.json({ response });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }

}