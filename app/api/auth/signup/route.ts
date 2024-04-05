import User from "@/app/models/user.model";
import { connect } from "@/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import bcrypt from 'bcryptjs';

connect();

async function getUserProfile(provider: string, accessToken: string) {
  try {
    // Define the API endpoint for the provider (e.g., Google)
    let apiUrl;
    switch (provider) {
      case "google":
        apiUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        break;
      // Add cases for other providers as needed
      default:
        throw new Error("Unsupported provider");
    }

    // Make a GET request to the provider's API endpoint
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    // Parse the response JSON to extract user profile data
    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
async function registerUser(req: NextRequest) {
  try {
    // check for the provider
    const userData = await req.json();
    if (userData.hasOwnProperty("provider")) {
      const userInfo = await getUserProfile(
        userData.provider,
        userData.prodiverAccessToken
      );
      
      return NextResponse.json({ userInfo }, { status: 200 });
    }
    //sign up through the email and password
    else {
      const { email, password, username } = userData;
      if (!email || !password || !username) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing Parametres | email | username | password",
          },
          { status: 403 }
        );
      }
      console.log(userData);
      const userExist = await User.findOne({ email });
      if (userExist) {
        return NextResponse.json(
          { success: false, message: "User already registered" },
          { status: 400 }
        );
      }
      //hash the password
      const hashedPassword = await bcrypt.hash(password,10);
      //create a new user
      const user = await User.create({
        username,
        password:hashedPassword,
        email,
      });
      if (user) {
        return NextResponse.json(
          {
            success:true,
            message: "User created successfully",
            user,
          },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {}
}

export { registerUser as POST };
