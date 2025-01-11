import CartModel from "../../../models/Cart.model.js";
import connectDb from "../../../lib/mongoose.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDb();

    try {
        const { email, productId } = await req.json();

        const cartItem = new CartModel({
            email,
            productId
        });

        await cartItem.save();

        return NextResponse.json({ cartItem });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }

}