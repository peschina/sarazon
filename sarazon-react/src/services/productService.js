import http from "./httpServices";
//import { apiEndpoint } from "../config.json";
const apiEndpoint = "http://localhost:3000/api";

export function getProducts() {
  return http.get(`${apiEndpoint}/products`);
}

export function getProduct(id) {
  return http.get(`${apiEndpoint}/products/${id}`);
}
