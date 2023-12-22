import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import "./Main.css";
import contentList from "./ContentData";
import ArcelikLoading from "../Loading/ArcelikLoading";
import Anteroom from "../../pages/Anteroom";
import { useSelector } from "react-redux";

const Main = ({ selectedIndex }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useSelector((slices) => slices.nav);

  // useEffect(() => {
  //   // setIsLoading(true)
  //   oktaAuth.handleLoginRedirect();
  //   // setTimeout(() => {
  //   //   setIsLoading(false)
  //   // }, 1000);
  // }, [oktaAuth]);

  const isValidIndex = nav.index >= 0 && nav.index < contentList.length;

  useEffect(() => {
    console.log("authState: ", authState);
    if (authState && authState.isAuthenticated) {
      // setIsLoading(true)
      oktaAuth.getUser().then((userInfo) => {
        // Example: Fetch user-specific data from your backend
        fetch("https://your-api-endpoint/data", {
          headers: {
            Authorization: `Bearer ${authState.accessToken.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setApiData(data))
          .catch((error) => console.error("Error fetching data:", error))
          .finally(() => setIsLoading(false));
      });
    }
    // oktaAuth.handleLoginRedirect();
  }, [authState, oktaAuth, nav.index]);

  const contentStyles = {
    fontSize: isValidIndex && nav.index === 0 ? "2.2rem" : "1.5rem",
  };

  return (
    <div className="main-container">
      {/* <Anteroom /> */}
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
              {apiData && <p>Data from API: {JSON.stringify(apiData)}</p>}
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
