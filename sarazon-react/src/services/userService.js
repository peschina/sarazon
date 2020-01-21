import http from "./httpServices";
import { apiEndpoint } from "../config.json";
const apiUrl = apiEndpoint + "/users";

export function getUser() {
  return http.get(`${apiUrl}/me`);
}

export function register({ username, email, password }) {
  return http.post(apiUrl, {
    username,
    email,
    password
  });
}
