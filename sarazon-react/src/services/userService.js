import http from "./httpServices";
import { apiEndpoint } from "../config.json";
const apiUrl = apiEndpoint + "/users";

export function register(user) {
  return http.post(apiUrl, {
    username: user.username,
    email: user.email,
    password: user.password
  });
}
