import http from "./httpServices";
import { apiEndpoint } from "../config.json";

export function getProducts() {
  return http.get(`${apiEndpoint}/products`);
}

export function getProduct(id) {
  return http.get(`${apiEndpoint}/products/${id}`);
}

export function getProductsByCategory(category) {
  const { _id } = category;
  return http.get(
    `${apiEndpoint}/products?categoryId=${encodeURIComponent(_id)}`
  );
}

export function getLatestProductsByCategory(category) {
  const { _id } = category;
  return http.get(
    `${apiEndpoint}/products?categoryId=${encodeURIComponent(
      _id
    )}&latest=${encodeURIComponent(true)}`
  );
}

export function getSponsoredProducts() {
  return http.get(
    `${apiEndpoint}/products?sponsored=${encodeURIComponent(true)}`
  );
}
