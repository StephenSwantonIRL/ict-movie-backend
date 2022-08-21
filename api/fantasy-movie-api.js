import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import Joi from "joi";
import { createToken } from "./jwt-utils.js";
import { UserArray, UserSpec, UserCredentialsSpec, UserSpecPlus, IdSpec, JwtAuth } from "../src/models/joi-schemas.js";
import { validationError } from "./logger.js";
import {MongoStore} from "../src/models/mongo/stores.js";

const saltRounds = 10;

export const movieApi = {
  find: {
    auth: false, 
    handler: async function(request, h) {
      try {
        const movies = await MongoStore.getAll("Movie");
        return movies;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await MongoStore.getByProperty(request.params.id,"_id","Movie");
        if (!user) {
          return Boom.notFound("No Movie with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No Movie with this id");
      }
    },
  },
  
  findOneByUser: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await MongoStore.getByProperty(request.params.id,"createdBy", "Movie");
        if (!user) {
          return Boom.notFound("No Movies for this user");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No Movies for this user");
      }
    },
  },


  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const movieDetails = request.payload;
        const movie = await MongoStore.addOne(movieDetails,"Movie");
        if (movie) {
          return h.response(movie).code(201);
        }
        return Boom.badImplementation("error creating movie");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new Movie",
    notes: "Adds a new movie to the database.",
  },


};