import Mongoose from "mongoose";

const { Schema } = Mongoose;

const movieSchema = new Schema({
  title: String,
  revokedAt: { type: Date, default: Date.now },
});

export const Token = Mongoose.model("Token", tokenSchema);
