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
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const users = await MongoStore.getAll("User");
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const user = await MongoStore.getByProperty(request.params.id,"_id","User");
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a User by ID",
    notes: "Returns details of a single user identified by their ID number",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  findOneByEmail: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const user = await MongoStore.getByProperty(request.payload.email,"email", 'User');
        if (!user) {
          return Boom.notFound("No User with this email");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this email");
      }
    },
    tags: ["api"],
    description: "Get a User by Email",
    notes: "Returns details of a single user identified by their Email",
    validate: { payload: Joi.object().keys({ email: Joi.string().email() }), failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        await MongoStore.deleteAll("User");
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes all users",
    notes: "Deletes all users from the database.",
  },



};