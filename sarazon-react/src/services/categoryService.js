import http from "./httpServices";
import { apiEndpoint } from "../config.json";

export function getCategories() {
  return http.get(`${apiEndpoint}/categories`);
}
