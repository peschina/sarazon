import http from "./httpServices";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/carts`;

export function getCartProducts() {
  return http.get(apiUrl);
}

export function updateCart(products) {
  const body = products.map(p => {
    return {
      _id: p._id,
      selectedQuantity: p.selectedQuantity
    };
  });
  return http.put(apiUrl, { products: body });
}
