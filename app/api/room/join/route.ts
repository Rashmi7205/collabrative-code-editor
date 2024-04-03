import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../helpers/getUserInfo";
import User from "@/app/models/user.model";
import Room from "@/app/models/room.model";

const joinRoom = async (req:NextRequest)=>{
    try {
        const id = await getDataFromToken(req);
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Login to access this route"
            },{status:402});
        } 
        const roomId = req.nextUrl.searchParams.get('roomid');
        if(!roomId){
            return NextResponse.json({
                success:false,
                message:"Missing paramter | roomid"
            },{status:403});
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
        const getIntoRoom = room.participants.push(id);
        if(!getIntoRoom){
            return NextResponse.json({
                success:false,
                message:"Cannot get into the room"
            },{status:403});
        }
        const setRoomList = user.roomList.push(roomId);
        user.isConnected=roomId;
        if(!setRoomList){
            return NextResponse.json({
                success:false,
                message:"Cannot get into the room"
            },{status:403});
        }   
        await user.save();
        await room.save();
        return NextResponse.json({
            success:true,
            message:"Connected to the room",
            room,
        },{status:200});
    
    } catch (error) {
        return  NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{status:500});
    }
}

const leaveRoom = async (req:NextRequest)=>{
    try {
        const id = await getDataFromToken(req);
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Login to access this route"
            },{status:402});
        } 
        const roomId = req.nextUrl.searchParams.get('roomid');
        if(!roomId){
            return NextResponse.json({
                success:false,
                message:"Missing paramter | roomid"
            },{status:403});
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
        

    } catch (error) {
        return  NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{status:500});
    }
}

export {
    joinRoom as POST,
    leaveRoom as GET
}