import http from "./httpServices";
import { apiEndpoint } from "../config.json";

export function updateUsername(username) {
  return http.post(`${apiEndpoint}/usernames`, {
    username: username
  });
}
