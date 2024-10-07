
import { dbConnect } from "@/service/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { User } from "@/model/user-model";

export const POST = async(request)=>{
    const {firstName, lastName, password, email, userRole} = await request.json();
    console.log(firstName, lastName, password, email, userRole);
    await dbConnect();
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = {
        firstName,
        lastName,
        email, 
        password: hashPassword,
        role: userRole
    }

    try {
        await User.create(newUser)
        return new NextResponse('user successfully created', {status: 201})
    } catch (error) {
        console.error(error)
        return new NextResponse(error.message, {status: 500})
    }
}