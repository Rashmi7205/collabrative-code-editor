import { client } from "@/app/appwrite";
import { Account, Databases, ID } from "appwrite";

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}


export const account = new Account(client);
const databases = new Databases(client);


export class AppwriteService {
    async createUserAccount({email, password, name}: CreateUserAccount) {
        try {
            const newUser = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_USER_COLL_ID,
                ID.unique(),
                {
                   name,
                   email,
                }   
            );

            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
               
                 return newUser?this.login({email, password}):null;
            } else {
                return userAccount;
            }    
        } catch (error:any) {
            throw error;
        }
    }

    async signInWithGoogle(){
        account.createOAuth2Session(
            "google",
            "http://localhost:3000/",
            "http://localhost:3000/login"
          );
    }

    async signInWithGithub (){
        account.createOAuth2Session(
            "github",
            "http://localhost:3000/",
            "http://localhost:3000/login"
          );
    }

    async login( { email, password }: LoginUserAccount) {
       try {
            return await account.createEmailSession(email, password)
       } catch (error:any) {
         throw error
       }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) {}

        return false
    }

    async getCurrentUser() {
        try {
            return account.get();
        } catch (error) {
            console.log("getcurrentUser error: " + error)
            
        }

        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }

    
}
const Appwrite =  new AppwriteService();
export default Appwrite;