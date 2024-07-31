import mongoose from "mongoose";

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  question: String,
  answers: {
    answerA: String,
    answerB: String,
    answerC: String,
    answerD: String,
  },
  correctAnswer: String,
  difficulty: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  updatedAt: Date,
});

export default model('Question', questionSchema);