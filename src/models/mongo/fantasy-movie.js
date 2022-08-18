import Mongoose from "mongoose";

const { Schema } = Mongoose;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  releaseDate:  { type: Date },
  cast:  [{
    type: Schema.Types.ObjectId,
    ref: "Actor",
  }],
  
});

export const Movie = Mongoose.model("Movie", movieSchema);

const actorSchema = new Schema({
  name: String,
  role: String  
});

export const Actor = Mongoose.model("Actor", actorSchema) 