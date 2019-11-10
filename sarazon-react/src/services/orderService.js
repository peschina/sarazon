import http from "./httpServices";
import { apiEndpoint } from "../config.json";

export function getOrders() {
  return http.get(`${apiEndpoint}/orders`);
}
