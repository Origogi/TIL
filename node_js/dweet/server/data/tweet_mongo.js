import * as userRepository from "../data/auth_mongo.js";
import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model("Tweet", tweetSchema);

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);

  return new Tweet({
    text,
    userId,
    name,
    username,
    url,
  }).save();
}

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}
