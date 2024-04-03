import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "../helpers/getUserInfo"
import User from "@/app/models/user.model";
import Room from "@/app/models/room.model";
import { connect } from "@/config/dbConnection";

connect();
const createRoom = async (req:NextRequest)=>{
        try {
            const id = await getDataFromToken(req);
            if(!id){
                return NextResponse.json({
                    success:false,
                    message:"Unauthorized User!"
                },{status:402}); 
            }
            const user = await User.findById(id);
            if(!user){
                return NextResponse.json({
                    success:false,
                    message:"Cannot find the user",
                },{status:402});              
            }
            console.log(user);
            //create room
            const room = await Room.create({
                host:user._id,
                status:'Active',
            });
            return NextResponse.json({
                success:true,
                message:"Room created sucessfully!",
                room,
            })
            

        } catch (error:any) {
            return NextResponse.json({
                success:false,
                message:"Internal Server Error"+error.message
            },{status:404}); 
        }
}
const getRoomDetails = async (req:NextResponse)=>{
    try {
        
    } catch (error:any) {
        
    }
}

export {
    getRoomDetails as GET,
    createRoom as POST
}

