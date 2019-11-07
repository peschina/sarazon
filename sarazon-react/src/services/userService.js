import http from "./httpServices";
//import { apiUrl } from "../config.json";
const apiUrl = "http://localhost:3000/api";
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password
  });
}
