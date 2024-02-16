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
export const postTutorialProgress = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(
      "/api/uservideo/updatetutorial",
      {
        isTutorialDone: true,
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
export const postVideoProgress = async (accessToken, videoCreds) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(
      "/api/uservideo/updatewatched",
      {
        isWatchedAll: videoCreds.isWatchedAll,
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
  const endpoint = "/api/--------";
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, question);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video Upload to DB
export const uploadVideoDB = async (accessToken, video) => {
  const endpoint = "/api/--------";
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, video);
    return response.data;
  } catch (error) {
    throw error;
  }
};
