import http from "./httpServices";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/addresses`;

export function getAddresses() {
  return http.get(apiUrl);
}

export function addAddress(addresses) {
  return http.post(apiUrl, { addresses });
}
