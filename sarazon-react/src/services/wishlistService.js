import http from "./httpServices";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/wishlists`;

export function getWishlist() {
  return http.get(apiUrl);
}

export function updateWishlist(products) {
  const body = products.map(p => {
    return {
      _id: p._id
    };
  });

  return http.put(apiUrl, { products: body });
}
