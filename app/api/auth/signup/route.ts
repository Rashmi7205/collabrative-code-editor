import {Databases, ID} from 'appwrite';
export async function POST(req:Request, res:Response) {
    try {
            const payload = await req.body;
            return  Response.json({
                payload
            });
    } catch (error :any) {
            return new Response("Internal Error", { status: 500 });
    }
} 