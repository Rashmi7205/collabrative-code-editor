import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import appwrite, { InputFile } from "node-appwrite";

//Appwrite configuration 
const client = new appwrite.Client();
const storage = new appwrite.Storage(client);
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!) 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) 
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_SECRET!); 


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await fs.writeFile(`./uploads/${data.fileName}`, data.content);

    const isStored = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      "2",
      InputFile.fromPath(
        `./uploads/${data.fileName}`,
        `./uploads/${data.fileName}`
      )
    );

    if (isStored) {
      return NextResponse.json({
        status: "success",
        isStored,
        message: "Data saved successfully",
      });
    }
    return NextResponse.json({
      message: "Data saved successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 404,
      message: "Internal Server Error" + error.message,
    });
  }
}

// {
//   "status": "success",
//   "isStored": {
//       "$id": "2",
//       "bucketId": "6608f08210ca335033c1",
//       "$createdAt": "2024-04-01T04:00:59.868+00:00",
//       "$updatedAt": "2024-04-01T04:00:59.868+00:00",
//       "$permissions": [],
//       "name": "./uploads/main.c",
//       "signature": "0b5fcfcbbc8777cf8dbdb44bbb80c045",
//       "mimeType": "text/x-c",
//       "sizeOriginal": 79,
//       "chunksTotal": 1,
//       "chunksUploaded": 1
//   },
//   "message": "Data saved successfully"
// }


