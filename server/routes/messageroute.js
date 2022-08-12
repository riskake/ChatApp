import express from "express";
import { Message } from "../models/message.js";

export const MessageRoute = new express.Router();

MessageRoute.get("/getmessages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error });
  }
});

MessageRoute.post("/postmessage", async (req, res) => {
  const { message, userName } = req.body;
  try {
    const messageBody = await Message.create({ message, userName });
    return res.json({ status: "ok", data: messageBody });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
  return res.sendStatus(200);
});
