import http from "./httpServices";
import { apiEndpoint } from "../config.json";
const apiUrl = `${apiEndpoint}/orders`;

export function getOrders() {
  return http.get(apiUrl);
}

export function addOrder(order) {
  return http.post(apiUrl, order);
}
