import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/app/models/user.model";
import { connect } from "@/config/dbConnection";

connect();

const getMyProfile = async (req:NextRequest)=>{
 
    try {
        const token = req.cookies.get('authToken');
        if(token){
            const { id, email }: { id: string, email: string } = jwt.verify(token.value, process.env.JWT_SECRET!) as { id: string, email: string };

            if(!id || !email){
                return NextResponse.json({
                 success: false,
                 message:"Account doesnot exist",
                },{status:402});
            }
            
            let user=await User.findById(id);
            if (!user) {
                return NextResponse.json({
                    success: false,
                    message:"user doesnot exist",
                   },{status:402});
            } 
            return NextResponse.json({
                success: true,
                message:"User data fetched successfully",
                user,
            },{status:200});
        }else{ 
            return NextResponse.json({
                success:false,
                message:"Unauthenticated user",     
            },{status:404});
        }
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{status:404});
    }
}

export {
    getMyProfile as GET,
}