import client from "@/app/appwrite";
import {Databases, ID} from 'appwrite';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    try {
            const payload = req.body;
            return  Response.json({
                payload
            })
    } catch (error :any) {
            return new Response("Internal Error", { status: 500 });
    }
} 