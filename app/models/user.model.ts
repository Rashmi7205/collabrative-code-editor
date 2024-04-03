import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const File = new mongoose.Schema({
    name: { type: String, required: true },
    fileId: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    authProvider:{
        type:String,
    },
    accessToken:{
        type:String,
    },
    password: {
        type: String,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isConnected: {
        type: Boolean,
        default: false,
    },
    roomList:{
        type:[
            {
                type:String,
            }
        ],
    },
    savedFiles:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                    ref: 'File',
            }
        ],
        
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

userSchema.methods = {
    generateJWTtoken: async function(){
        return await jwt.sign({
            id:this._id,
            email:this.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn:process.env.JWT_EXPIRY
        })
    },
    generatePasswordResetToken:async function(){
       const resetToken = crypto.randomBytes(10).toString('hex');

       this.forgotPasswordToken = crypto.createHash('sha256')
       .update(resetToken)
       .digest('hex')

        return resetToken;
    },
    comparePassword:async function(userPassword:string){
        return await bcrypt.compare(userPassword,this.password);
    }
}
const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User;