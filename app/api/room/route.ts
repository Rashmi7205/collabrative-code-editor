import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../helpers/getUserInfo";
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

            //create room
            const room = await Room.create({
                host:user._id,
                status:'Active',
            });

            user.roomList.push(room._id);
            await user.save();

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
const getRoomDetails = async (req:NextRequest)=>{
    try {
    
        const roomId = req.nextUrl.searchParams.get('roomid');
        if(!roomId){
            return NextResponse.json({
                success:false,
                message:"Missing paramter | roomid"
            },{status:403});
        }
        const id = await getDataFromToken(req);
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Cannot  access this resource"
            },{status:402});
        }
        const user = await User.findById(id);
        if(!user){
            return NextResponse.json({
                success:false,
                message:"Unauthenticated user",
            },{status:402});
        }
        const room = await Room.findById(roomId);
        if(!room){
            return NextResponse.json({
                success:false,
                message:"Cannot find the room"
            },{status:402});
        }
       return NextResponse.json({
           success:true,
           message:"Room details Fetched successfully",
           room,
       },{status:200});
    } catch (error:any) {
        return  NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{status:500});
    }
}
//delete the room
const deleteRoom = async (req:NextRequest)=>{
    try {
        const roomId = req.nextUrl.searchParams.get('roomid');
        if(!roomId){
            return NextResponse.json({
                success:false,
                message:"Missing paramter | roomid"
            },{status:403});
        }
        const id = await getDataFromToken(req);
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Cannot  access this resource"
            },{status:402});
        } 
        const room = await Room.findById(roomId);
        if(!room){
            return NextResponse.json({
                success:false,
                message:"This room does not exist"
            },{status:402});
        }
        if(roomId!==String(room.host)){
            return NextResponse.json({
                success:false,
                message:"Invalid access | You are not the Host"
            },{status:404});
        }
        const isRoomDeleted = await Room.findByIdAndDelete(roomId);
        if(!isRoomDeleted){
            return NextResponse.json({
                success:true,
                message:"Unable to delete the room"
            },{status:404});
        }
        return NextResponse.json({
            success:true,
            message:"Room deleted successfully"
        },{status:200});

    } catch (error) {
        return  NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{status:500});
    }
}

export {
    getRoomDetails as GET,
    createRoom as POST,
    deleteRoom as DELETE
}

