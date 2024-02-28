import axios from "axios";

// const baseURL = "https://localhost:7026/"; // local backend URL
const baseURL = "http://164.92.200.35:5219/"; // Replace with your API base URL

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

    const response = await instance.post("/api/saveuser/save", {});
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
  const endpoint = "/api/uservideo/status";
  try {
    setAuthHeader(accessToken);
    const response = await instance.get(endpoint);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postVideoProgress = async (accessToken, videoCreds) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(
      "/api/uservideo/updatewatched",
      {
        WatchedVideoId: videoCreds.WatchedVideoId,
        WatchedTimeInseconds: videoCreds.WatchedTimeInseconds,
      },
      {
        headers: {
          "Custom-Header": "value",
        },
      }
    );
    // console.log(response.data);
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
export const getSettings = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.get(
      "/api/application-settings/getapplication"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz Status - Get
export const getQuizStatus = async (accessToken) => {
  const endpoint = "/api/quiz/isPassedStatus";
  try {
    setAuthHeader(accessToken);

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz - Get
export const getQuestions = async (accessToken) => {
  const endpoint = "/api/quiz/questions";
  try {
    setAuthHeader(accessToken);

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz - Post
export const postQuestionResponses = async (accessToken, responses) => {
  const endpoint = "/api/quiz/submit";
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(endpoint, responses);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Question Upload to DB
export const uploadQuestionDB = async (accessToken, question) => {
  const endpoint = "/api/adminquestion/postquestion";
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, question);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video Upload to DB
export const uploadVideoDB = async (accessToken, title, videoFile) => {
  const endpoint = "/api/adminvideo/upload";
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, title, videoFile);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Video Update Title to DB
export const updateVideoTitleDB = async (accessToken, title, id) => {
  const endpoint = "/api/adminvideo/"+id;
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, title);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Video Delete  DB
export const deleteVideoDB = async (accessToken, id) => {
  const endpoint = "/api/adminvideo/"+id;
  try {
    setAuthHeader(accessToken);
    const response = await instance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
