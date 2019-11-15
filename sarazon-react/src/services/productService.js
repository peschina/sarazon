import http from "./httpServices";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/products`;

export function getProducts() {
  return http.get(`${apiUrl}`);
}

export function getProduct(id) {
  return http.get(`${apiUrl}/${id}`);
}

export function getProductsByCategory(category) {
  const { _id } = category;
  return http.get(`${apiUrl}?categoryId=${encodeURIComponent(_id)}`);
}

export function getLatestProductsByCategory(category) {
  const { _id } = category;
  return http.get(
    `${apiUrl}?categoryId=${encodeURIComponent(
      _id
    )}&latest=${encodeURIComponent(true)}`
  );
}

export function getSponsoredProducts() {
  return http.get(`${apiUrl}?sponsored=${encodeURIComponent(true)}`);
}
