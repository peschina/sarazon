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

export function updateUsername(username) {
  return http.post(`${apiEndpoint}/change_username`, { username });
}

export function changePassword(password) {
  return http.post(`${apiEndpoint}/change_password`, { password });
}
