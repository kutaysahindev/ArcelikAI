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

const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const { videoCount } = useSelector((slices) => slices.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidIndex = nav.index >= 0 && nav.index < contentList.length;

  useEffect(() => {
    oktaAuth
      .getUser()
      .then((user) => {
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

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = authState.accessToken.accessToken;
      dispatch(setAccessToken(accessToken));

      validateToken(accessToken)
        .then((status) => {
          if (status === 200) {
            // Check against the specific status code
            dispatch(signUserIn());
          } else {
            dispatch(logUserOut());
            dispatch(setStatus("f"));
            console.error("Token validation failed with status:", status);
          }
        })
        .catch((error) => {
          dispatch(logUserOut());
          dispatch(setStatus("f"));
          console.error("Error validating token:", error);
        });
    } else {
      dispatch(logUserOut());
    }
  }, [authState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const video = await getVideoProgress(user.accessToken);
        console.log("video (fetch): ", video);
        dispatch(setIsTutorialDone(video.isTutorialDone));
        dispatch(setVideos(video.VideoDetails));
        dispatch(setVideoCount(video.VideoCount));
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
    const fetchSettings = async () => {
      try {
        const settings = await getSettings(user.accessToken);
        console.log("ayar ", settings);
        dispatch(updateSettings(settings));
      } catch (error) {
        throw error;
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

  useEffect(() => {
    let timerId;
    if (user.isLoading) {
      timerId = setTimeout(() => {
        if (user.isSignedIn) navigate("/form");
        dispatch(setIsLoading(false));
      }, 3500);
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
