import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//to get messages between 2 users
router.get("/:id", protectRoute, getMessages);
//:id is the recieverId that the sender is sending message to
router.post("/send/:id", protectRoute, sendMessage);

export default router;
