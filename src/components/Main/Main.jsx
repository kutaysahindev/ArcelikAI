import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import "./Main.css";
import contentList from "./ContentData";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut, setIsLoading, signUserIn, userInfoUpdate } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import LoadingLayer from "../Loading/LoadingLayer";

const Main = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
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
    // Ensure authState is available and user is authenticated
    if (authState && authState.isAuthenticated) {
      const accessToken = authState.accessToken.accessToken;
       // AXIOS - POSTING ACCESS TOKEN
      axios
        .post(
          "https://localhost:7188/api/tokenvalidate/validate",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const status = res.status === 200 ? true : false;
          if (status) {
            dispatch(signUserIn())
          }
        })
        .catch((error) => {
          dispatch(logUserOut())
          console.error("Error validating token:", error);
        });
    }
  }, [authState, dispatch]);

  const contentStyles = {
    fontSize: isValidIndex && nav.index === 0 ? "2.2rem" : "1.5rem",
  };

  useEffect(() => {
    let timerId
    if(user.isLoading){
      timerId = setTimeout(() => {
        if(user.isSignedIn) navigate('/form')
        dispatch(setIsLoading(false));
      }, 3500);
      }
    return () => clearInterval(timerId);
  }, [user.isLoading, dispatch, navigate, user.isSignedIn])
  

  return (
    <>
    {user.isLoading && <LoadingLayer oktaSign={authState?.isAuthenticated} isApproved={user.isSignedIn} />}
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
                onClick={() => oktaAuth.signOut()}
              >
                Logout
              </button>
            </div>
          )}
          {nav.index === 0 && !authState?.isAuthenticated && (
            <button
              className="login-button"
              onClick={() => {
                oktaAuth.signInWithRedirect()
                dispatch(setIsLoading(true));
              }}
              >
              Login with Okta
            </button>
          )}
        </div>
      )}
      {!isValidIndex && <p className="main-content">Invalid index selected</p>}
    </div>
          </>
  );
};

export default Main;
