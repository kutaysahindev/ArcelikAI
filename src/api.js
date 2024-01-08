import axios from "axios";

const baseURL = "https://localhost:7026"; // Replace with your API base URL

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const validateToken = async (accessToken) => {
  try {
    const response = await instance.post(
      "/api/tokenvalidate/validate",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getAiModals = async () => {
  try {
    const response = await instance.get("/api/models");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createApp = async (formData) => {
  try {
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
