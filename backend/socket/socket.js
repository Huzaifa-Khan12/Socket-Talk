import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

//creating a socket server on top of the express server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{userId: socketId}

//to get the socket id of the user
export const getRecieverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

//listening for connections
//socket is the user that is connected
io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //io.emit() sends events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on() is used to listen to events. Can be used on both client and server-sdie
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
