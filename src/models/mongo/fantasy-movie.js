import Mongoose from "mongoose";

const { Schema } = Mongoose;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  releaseDate:  { type: Date },
  cast:  [{
      id: String,
      name: String,
      role: String 
     }],
  
});

export const Movie = Mongoose.model("Movie", movieSchema);
