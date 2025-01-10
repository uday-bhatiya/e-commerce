import ProductModel from "../../../models/product.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { limit, skip } = await req.json();

    try {
        const response = await ProductModel.find({})
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'createdById'
            });
        if (!response) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch product"
            });
        }

        return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }

}