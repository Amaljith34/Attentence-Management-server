import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // 'admin' or user ID
  receiver: { type: String, required: true }, // 'admin' or user ID
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat
