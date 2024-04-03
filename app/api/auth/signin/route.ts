import User from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server"

const signIn  = async (req:NextRequest) => {
    try {
        const userInfo = await req.json();
        const {email,password} = userInfo;
        if(!email || !password){
            return NextResponse.json({
                success:false,
                message:"Misssing Parameter , email or password",
            },{status:403});
        }
        //getting the user account exist or not
        const userExist = await User.findOne({email});
        if(!userExist){
            return NextResponse.json({
                success: false,
                message:"User doesnot exist",
            },{status:402});
        }

        const  isValidPassword=await userExist.comparePassword(password,userExist.password);
        
        if (!isValidPassword) {
            return NextResponse.json({
              success: false,
              message: 'Invalid Password',
            },{status:401});
        }
        userExist.password = undefined;
        const token = await userExist.generateJWTtoken();
        //set the cookies
        
        const res =  NextResponse.json({
            success:true,
            message:"Logged in successfully",
            userExist
        },{status:200});

        res.cookies.set("authToken",token,{
           path:'/',
           httpOnly:true,
        });

        return res;

    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"+error.message
        },{status:404});
    }
}

export {
    signIn as POST
}