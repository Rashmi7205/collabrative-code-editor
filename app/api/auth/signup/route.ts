import User from "@/app/models/user.model";
import { connect } from "@/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';

connect();

async function getUserProfile(provider:string, accessToken:string) {
    try {
        // Define the API endpoint for the provider (e.g., Google)
        let apiUrl;
        switch (provider) {
            case 'google':
                apiUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
                break;
            // Add cases for other providers as needed
            default:
                throw new Error('Unsupported provider');
        }

        // Make a GET request to the provider's API endpoint
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        // Parse the response JSON to extract user profile data
        const userProfile = await response.json();
        return userProfile;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}
async function registerUser(req:NextRequest){
    try {
        // check for the provider 
        const userData = await req.json();
        if(userData.hasOwnProperty("provider")){

        }
        //if email reg
        else{
            const {email,password,username} = userData;
            if(!email || !password || !username){
                return NextResponse.json({error: "Missing Parametres | email | username | password"}, {status: 403});
            }
            const userExist = await User.findOne({email});
            if(userExist){
                return NextResponse.json({error: "User already registered"}, {status: 400});
            }
            //create a new user
            const user = await User.create({
              username,
              password,
              email
            });
            if(user){
                return NextResponse.json({
                    message:"User created successfully",
                    user,
                },{status:200});
            }
        }

    } catch (error:any) {
        
    }
}

export {
    registerUser as POST,
}

