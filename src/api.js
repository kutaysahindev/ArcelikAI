import axios from "axios";

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
  try {
    setAuthHeader(accessToken);

    const response = await instance.get("/api/models");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createApp = async (accessToken, formData) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post("/api/createapp", formData, {
      headers: {
        "Custom-Header": "value",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
