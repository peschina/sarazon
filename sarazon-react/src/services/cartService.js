import http from "./httpServices";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/carts`;

export function addProductToCart(product) {
  const { _id, selectedQuantity } = product;
  // OR JUST PASS PRODUCT
  return http.put(apiUrl, { _id, selectedQuantity });
}
