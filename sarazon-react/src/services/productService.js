import http from "./httpServices";
import { apiEndpoint } from "../config.json";

export function getProducts() {
  return http.get(`${apiEndpoint}/products`);
}

export function getProduct(id) {
  return http.get(`${apiEndpoint}/products/${id}`);
}

export function getProductByCategory(category) {
  const { name, _id } = category;
  return http.get(
    `${apiEndpoint}/products?categoryId=${encodeURIComponent(
      _id
    )}&name=${encodeURIComponent(name)}`
  );
}
