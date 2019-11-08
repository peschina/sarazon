import http from "./httpServices";
//import { apiUrl } from "../config.json";
const apiUrl = "http://localhost:3000/api";
const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, {
    email,
    password
  });
}
