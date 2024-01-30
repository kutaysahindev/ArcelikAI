/* eslint-disable no-unused-vars */
//Imports
import { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import {
  logUserOut,
  setAccessToken,
  setIsLoading,
  setIsTutorialDone,
  setStatus,
  signUserIn,
  userInfoUpdate,
} from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingLayer from "../Loading/LoadingLayer";
import "./Main.css";
import contentList from "./ContentData";
import { getSettings, getVideoProgress, validateToken } from "../../api"; // Import the validateToken function
import {
  closeVideoWindow,
  completeAll,
  completeVideo,
  proceedAt,
  setSelectedVideo,
  setVideoCount,
  setVideoMark,
  setVideos,
} from "../../redux/videoSlice";
import { updateSettings } from "../../redux/settingSlice";

//Main Component
const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const { videoCount } = useSelector((slices) => slices.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidIndex = nav.index >= 0 && nav.index < contentList.length;

  //Fetching user data through Okta
  useEffect(() => {
    oktaAuth
      .getUser()
      .then((user) => {
        // Convert timezone to check data reliability
        const myDate = new Date(user.headers.date);
        const newDate = myDate.toLocaleString("en-US", {
          timezone: "Europe/Istanbul",
        });
        dispatch(
          userInfoUpdate({ name: user.name, email: user.email, date: newDate })
        );
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, [oktaAuth, dispatch]);

  //Token validation through back-end
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = authState.accessToken.accessToken;
      dispatch(setAccessToken(accessToken));

      validateToken(accessToken)
        .then(() => dispatch(signUserIn()))
        .catch((error) => {
          dispatch(logUserOut());
          dispatch(setStatus("f"));
          console.error("Error validating token:", error);
        });
    } else {
      dispatch(logUserOut());
    }
  }, [authState]);

  //Fetch tutorial & user info from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const video = await getVideoProgress(user.accessToken);
        console.log("video (fetch): ", video);
        dispatch(setVideos(video.VideoDetails));
        dispatch(setVideoCount(video.VideoCount));
        if (video.isTutorialDone) dispatch(setIsTutorialDone("0done"));
        if (video.isWatchedAll) dispatch(completeAll());
        else
          dispatch(
            proceedAt({
              video: video.WatchedVideoId,
              time: video.WatchedTimeInSeconds,
            })
          );
      } catch (error) {
        throw error;
      }
    };

    //Fetch user settings from DB
    const fetchSettings = async () => {
      try {
        const settings = await getSettings(user.accessToken);
        dispatch(updateSettings(settings));
      } catch (error) {
        console.error("Error fetching user settings", error);
      }
    };
    if (user.isSignedIn && user.accessToken) {
      fetchData();
      fetchSettings();
    }
  }, [user.isSignedIn, user.accessToken]);

  const contentStyles = {
    fontSize: isValidIndex && nav.index === 0 ? "2.2rem" : "1.5rem",
  };

  //Animation timeout
  useEffect(() => {
    let timerId;
    if (user.isLoading) {
      timerId = setTimeout(() => {
        if (user.isSignedIn) navigate("/form");
        dispatch(setIsLoading(false));
      }, 4500);
    }
    return () => clearInterval(timerId);
  }, [user.isLoading, dispatch, navigate, user.isSignedIn]);

  return (
    <>
      {user.isLoading && (
        <LoadingLayer
          oktaSign={authState?.isAuthenticated}
          isApproved={user.isSignedIn}
        />
      )}
      <div className="main-container">
        {isValidIndex && (
          <div>
            <p
              className={`main-title ${
                isValidIndex && nav.index === 0
                  ? "animate-login"
                  : "animate-other"
              } add-margin-bottom`}
            >
              {contentList[nav.index].title}
            </p>
            <p className="main-text" style={contentStyles}>
              {contentList[nav.index].content}{" "}
            </p>
            {authState && authState.isAuthenticated && nav.index === 0 && (
              <div>
                <button
                  className="login-button"
                  onClick={() => {
                    oktaAuth.signOut();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
            {nav.index === 0 && !authState?.isAuthenticated && (
              <button
                className="login-button"
                onClick={() => {
                  oktaAuth.signInWithRedirect();
                  dispatch(setIsLoading(true));
                }}
              >
                Login with Okta
              </button>
            )}
          </div>
        )}
        {!isValidIndex && (
          <p className="main-content">Invalid index selected</p>
        )}
      </div>
    </>
  );
};

export default Main;
