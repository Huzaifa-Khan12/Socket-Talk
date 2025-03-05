import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const recieverId = await req.params.id;
    console.log(recieverId);

    //get the _id from user set in the protectRoute middleware
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      // $ all means to that the record field participants should containe all the array values
      participants: { $all: [senderId, recieverId] },
    });

    //if conversation does not exist yet, we create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    //adding the message to first the Message collection
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    // then pushing the _id to conversation messages field
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //this make both save run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send message controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
