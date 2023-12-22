import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

const Profile = () => {
  const { authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      setUserInfo(authState.idToken.claims);
    }
  }, [authState]);

  useEffect(() => {
    // Post user information to the backend using Axios
    const postUserData = async () => {
      try {
        const backendEndpoint = "https://your-backend-api.com/save-profile";
        await axios.post(backendEndpoint, { userInfo });
        console.log("User profile data sent to the backend");
      } catch (error) {
        console.error("Error sending user profile data to the backend", error);
      }
    };

    // Check if userInfo is available before making the post request
    if (userInfo) {
      postUserData();
    }
  }, [userInfo]);

  return null; // The component won't render anything on the page
};

export default Profile;
