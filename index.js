import express from "express";
import { createServer } from "node:http";

import connectToDatabase from "./src/db/db.connect.js";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/users/", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const start = async () => {
  try {
    await connectToDatabase();
    server.listen(app.get("port"), () => {
      console.log("LISTENING ON PORT 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

start();
