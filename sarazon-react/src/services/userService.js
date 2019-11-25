import http from "./httpServices";
import { apiEndpoint } from "../config.json";
const apiUrl = apiEndpoint + "/users";

export function register({ username, email, password }) {
  return http.post(apiUrl, {
    username,
    email,
    password,
  });
}
