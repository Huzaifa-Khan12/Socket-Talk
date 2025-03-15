import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); //to get the cookie parsed for the files after (especially in protectRoute.js)
//middleware to go the auth routes
app.use("/api/auth", authRoutes);
//middleware to go the message routes
app.use("/api/messages", messageRoutes);
//middleware to go the user routes
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server listening on port: ${port}`);
});
