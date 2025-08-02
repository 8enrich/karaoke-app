import Cookies from "js-cookie";
import { BACKEND_URL } from "../settings";
import axiosInstance from "./axios";

export const isAuthenticated = async () => {
  try {
    const response = await fetch(BACKEND_URL + "/user", {
      headers: {
        "auth": getToken()
      }
    });
    return response.ok;
  } catch(error) {}
  return false
};

export const getToken = () => {
  return Cookies.get('auth');
};

export const login = (token) => {
  Cookies.set('auth', token, {
    expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
    path: '',            
    sameSite: 'Strict'
  });
};

export const isAdmin = async () => {
  try{
    await axiosInstance.get('/admin');
    return true;
  } catch(error){
    return false
  }
}
