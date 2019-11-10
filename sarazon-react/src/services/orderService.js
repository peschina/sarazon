import http from "./httpServices";
//import { apiEndpoint } from "../config.json";
const apiEndpoint = "http://localhost:3000/api";

export function getOrders() {
  return http.get(`${apiEndpoint}/orders`);
}
