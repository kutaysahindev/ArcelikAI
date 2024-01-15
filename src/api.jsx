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

    const response = await instance.post("/api/tokenvalidation/validation", {});
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createApp = async (formData, accessToken) => {
  try {
    setAuthHeader(accessToken);

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

export const getVideoProgress = async (accessToken) => {
  const endpoint = "/api/uservideo/iswatched";
  try {
    setAuthHeader(accessToken);
    const response = await instance.get(endpoint);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postVideoProgress = async (accessToken) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(
      "/api/uservideo/iswatched",
      { isWatched: true },
      {
        headers: {
          "Custom-Header": "value",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideos = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.get("/api/videos");
    return response.data;
  } catch (error) {
    throw error;
  }
};
