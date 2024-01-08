import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
 
const baseURL = "https://localhost:7026"; // Replace with your API base URL
 
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
const setAuthHeader = (accessToken) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};
 
export const validateToken = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
 
    const response = await instance.post("/api/tokenvalidate/validate", {});
    return response.status;
  } catch (error) {
    throw error;
  }
};
 
export const getAiModals = async (accessToken) => {
  const endpoint = "/api/models";
  try {
    setAuthHeader(accessToken);
 
    const response = await instance.get(endpoint);
    // const data = await response.json();
    return response.data;
  } catch (error) {
    throw error;
  }
};
 
export const createApp = async (formData) => {
  try {
    // setAuthHeader(accessToken);
 
    const response = await instance.post("/api/createapp", formData, {
      headers: {
        "Custom-Header": "value",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};