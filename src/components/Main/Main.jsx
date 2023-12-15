import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import "./Main.css";
import contentList from "./ContentData";
import ArcelikLoading from '../Loading/ArcelikLoading'

const Main = ({ selectedIndex }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   // setIsLoading(true)
  //   oktaAuth.handleLoginRedirect();
  //   // setTimeout(() => {
  //   //   setIsLoading(false)
  //   // }, 1000);
  // }, [oktaAuth]);

  const isValidIndex = selectedIndex >= 0 && selectedIndex < contentList.length;

  useEffect(() => {
    console.log('authState: ', authState)
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
          .finally(() => setIsLoading(false))
      });
    }
    // oktaAuth.handleLoginRedirect();
  }, [authState, oktaAuth, selectedIndex]);

  const contentStyles = {
    fontSize: isValidIndex && selectedIndex === 0 ? "2.2rem" : "1.5rem",
  };

  return (
    <div className="main-container">
      {false && (
        <div className='loading-container'>
          <div className="loading-frame">
            <ArcelikLoading />
          </div>
        </div>
      )}
      {isValidIndex && (
        <div>
          <p
            className={`main-title ${
              isValidIndex && selectedIndex === 0
                ? "animate-login"
                : "animate-other"
            } add-margin-bottom`}
          >
            {contentList[selectedIndex].title}
          </p>
          <p className="main-text" style={contentStyles}>
            {contentList[selectedIndex].content}{" "}
          </p>
          {authState && authState.isAuthenticated && selectedIndex === 0 && (
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
          {selectedIndex === 0 && !authState?.isAuthenticated && (
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
