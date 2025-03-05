import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//:id is the recieverId that the sender is sending message to
router.post("/send/:id", protectRoute, sendMessage);

export default router;
