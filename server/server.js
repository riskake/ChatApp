import express from "express";
import * as path from "path";
import { MessageRoute } from "./routes/messageroute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BodyParser from "body-parser";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(BodyParser.json());
app.use(express.static("../client/dist"));
app.use(cors());

app.use("/api/message", MessageRoute);
mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
  console.log("Connected to MongoDB...");
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
