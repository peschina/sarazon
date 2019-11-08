import http from "./httpServices";
//import { apiEndpoint } from "../config.json";
const apiEndpoint = "http://localhost:3000/api";

export function getCategories() {
  return http.get(`${apiEndpoint}/categories`);
}
