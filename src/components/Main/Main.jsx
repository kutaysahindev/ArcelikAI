import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import "./Main.css";
import contentList from "./ContentData";
import { useDispatch, useSelector } from "react-redux";
import { approveHandler, logUserOut, signUserIn, userInfoUpdate } from "../../redux/userSlice";
// import { logUserOut, signUserIn } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Main = () => {
  const [isApproved, setIsApproved] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { authState, oktaAuth } = useOktaAuth();
  // const user = useSelector((slices) => slices.user);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const isValidIndex = nav.index >= 0 && nav.index < contentList.length;

  // const responseHandler = (status) => {
  //   if (authState?.isAuthenticated && status === 200) {
  //     setIsApproved(true);
  //     dispatch(signUserIn());
  //     setTimeout(() => {
  //       navigate("/form");
  //     }, 1500);
  //   } else {
  //     setIsApproved(false);
  //     dispatch(logUserOut());
  //     setTimeout(() => {
  //       if(authState?.isAuthenticated) oktaAuth.signOut();
  //       else navigate("/");
  //     }, 1500);
  //   }
  // };

  // const approveHandler = async () => {
  //   const endpoint =
  //     "https://6582f75e02f747c8367abde3.mockapi.io/api/v1/backendApproval";
  //   // AXIOS - GETTING APPROVAL FOR ACCESS TOKEN
  //   axios
  //     .get(endpoint)
  //     .then((res) => responseHandler(res.status))
  //     .catch((err) => console.error(err.message));
  // };

  // useEffect(() => {
  //   approveHandler();
  // }, []);

  // useEffect(() => {
  //   if (authState?.isAuthenticated && !user.isSignedIn) navigate("/anteroom");
  // }, [authState, user.isSignedIn, navigate]);

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
      //  AXIOS - POSTING ACCESS TOKEN
      axios
        .post(
         "https://localhost:7026/api/tokenvalidation/validation",
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
            navigate('/anteroom')
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error validating token:", error);
          dispatch(logUserOut())
          navigate('/anteroom')
        });
    //   const endpoint =
    //   "https://6582f75e02f747c8367abde3.mockapi.io/api/v1/backendApproval";
    // axios
    //   .get(endpoint)
    //   .then((res) => {
    //     const status = res.status === 200 ? true : false;
    //     if (status) {
    //       dispatch(signUserIn())
    //       navigate('/anteroom')
    //     }
    //   })
    //   .catch((err) => console.error(err.message));
    }
  }, [authState]);

  const contentStyles = {
    fontSize: isValidIndex && nav.index === 0 ? "2.2rem" : "1.5rem",
  };

  return (
    <div className="main-container">
      {isApproved && <h1>GİRİŞ</h1>}
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
              onClick={() => oktaAuth.signInWithRedirect()}
            >
              Login with Okta
            </button>
          )}
        </div>
      )}
      {!isValidIndex && <p className="main-content">Invalid index selected</p>}
    </div>
  );
};

export default Main;
