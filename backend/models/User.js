import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  score: Number,
  createdAt: Date,
  updatedAt: Date,
});

export default model('User', userSchema);