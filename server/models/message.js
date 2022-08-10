import mongoose from "mongoose";
import { User } from "./user";

const MessageSchema = new mongoose.Schema ({
    message:{
        type: String
    },
    userName:{
        type: String
    }
});

export const Message = mongoose.model('MessageSchema', MessageSchema);