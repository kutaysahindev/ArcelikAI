import React, { useEffect } from "react";
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
import {
  getQuestions,
  getQuizStatus,
  getSettings,
  getVideoProgress,
  validateToken,
} from "../../api";
import {
  completeAll,
  proceedAt,
  setVideoCount,
  setVideos,
} from "../../redux/videoSlice";
import { updateSettings } from "../../redux/settingSlice";
import {
  setQuestions,
  setResult,
  setSelectedQuestion,
} from "../../redux/quizSlice";
import { closeWindow } from "../../redux/windowSlice";
import { questionFormatter } from "../../utils/questionFormatter";

const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidIndex = nav.index >= 0 && nav.index < contentList.length;

  const userInfoHandler = () => {
    oktaAuth
      .getUser()
      .then((user) => {
        const myDate = new Date(user.headers.date);
        const newDate = myDate.toLocaleString("en-US", {timezone: "Europe/Istanbul"});
        dispatch(userInfoUpdate({ name: user.name, email: user.email, date: newDate }));
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }

  const accessTokenValidation = () => {
    const accessToken = authState.accessToken.accessToken;
    dispatch(setAccessToken(accessToken));
    validateToken(accessToken)
      .then(() => dispatch(signUserIn()))
      .catch((error) => {
        dispatch(logUserOut());
        dispatch(setStatus("f"));
        console.error("Error validating token:", error);
      });
  }

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      userInfoHandler();
      accessTokenValidation();
    } else {
      dispatch(logUserOut());
    }
  }, [authState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [video, settings, quiz, quizStatus] = await Promise.all([
          getVideoProgress(user.accessToken),
          getSettings(user.accessToken),
          getQuestions(user.accessToken),
          getQuizStatus(user.accessToken),
        ]);
        // VIDEO
        dispatch(setVideos(video.VideoDetails));
        dispatch(setVideoCount(video.VideoCount));
        if (video.isTutorialDone) dispatch(setIsTutorialDone("0done"));
        if (video.isWatchedAll) {
          dispatch(completeAll());
          dispatch(closeWindow());
        } else {
          dispatch(
            proceedAt({
              video: video.WatchedVideoId,
              time: video.WatchedTimeInSeconds,
            })
          );
        }
        // SETTINGS
        dispatch(updateSettings(settings));
        // QUIZ
        const newQuiz = questionFormatter(quiz);
        dispatch(setQuestions(newQuiz));
        dispatch(setSelectedQuestion(newQuiz[0].Id));
        if (quizStatus[0]) dispatch(setResult("passed"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user.isSignedIn && user.accessToken) {
      fetchData();
    }
  }, [user.isSignedIn, user.accessToken]);

  useEffect(() => {
    let timerId;
    if (user.isLoading) {
      timerId = setTimeout(() => {
        if (user.isSignedIn) navigate("/form");
        dispatch(setIsLoading(false));
      }, 3000);
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
            <p className="main-text" style={{fontSize: isValidIndex && nav.index === 0 ? "2.2rem" : "1.5rem"}}>
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