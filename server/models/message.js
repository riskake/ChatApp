import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema ({
    message:{
        type: String
    },
    userName:{
        type: String
    }
});

export const Message = mongoose.model('MessageSchema', MessageSchema);