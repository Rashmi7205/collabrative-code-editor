import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    status:{
        type:String,
        required:[true,'Room status is required']
    },
    participants:[
           { type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});
const  Room= mongoose.models.rooms || mongoose.model('Room',roomSchema);

export default  Room;