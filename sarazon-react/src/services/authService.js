import jwtDecode from "jwt-decode";
import http from "./httpServices";
//import { apiUrl } from "../config.json";
const apiUrl = "http://localhost:3000/api";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
