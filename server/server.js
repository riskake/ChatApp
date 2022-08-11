import express from "express";
import * as path from "path";
import { MessageRoute } from "./routes/messageroute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(BodyParser.json());
app.use(express.static("../client/dist"));

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