import { userApi } from "../api/user-api.js"
import { movieApi } from "../api/fantasy-movie-api.js"

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "GET", path: "/api/fantasyMovie/{id}", config: movieApi.findOne },
  { method: "GET", path: "/api/fantasyMovie/all/{id}", config: movieApi.findOneByUser },
  
  { method: "POST", path: "/api/users/find", config: userApi.findOneByEmail },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "POST", path: "/api/revokeToken", config: userApi.revokeToken },
  { method: ["GET", "POST","DELETE"], path: "/api/checkToken", config: userApi.checkToken },
  
  { method: "POST", path: "/api/movies", config: movieApi.create },
];