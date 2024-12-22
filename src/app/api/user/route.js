import connectDb from "../../../lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from '../../../models/user.model';

export async function POST(req) {
    connectDb();

    try {
        const { user } = await req.json();
   
        const existingUser = await UserModel.findOne({ email: user?.primaryEmailAddress.emailAddress });
        if ( existingUser ) {
            return NextResponse.json({
                success: true,
                message: "User already exist",
                date: existingUser
            }, { status: 201})
        }

        const newUser = await UserModel.create({
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            image: user?.imageUrl
        })

        return NextResponse.json({
            success: true,
            data: newUser
        })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
        }, { status: 500 })
    }
}