import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import LoadingLayer from "../components/Loading/LoadingLayer";

const Anteroom = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          // Example: Validate token with your backend
          const response = await fetch(
            "https://your-api-endpoint/validate-token",
            {
              headers: {
                Authorization: `Bearer ${authState.accessToken.accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            // Token validation successful, redirect to /form page
            navigate("/form");
          } else if (response.status === 401) {
            // Token validation failed, set shouldRender to true
            setShouldRender(true);
          } else {
            // Handle other HTTP status codes accordingly
            console.error("Unexpected response:", response);
          }
        } else {
          // User not authenticated, render Anteroom
          setShouldRender(true);
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        // Handle error and set shouldRender to true if needed
        setShouldRender(true);
      } finally {
        // Stop loading animation
        setIsLoading(false);
      }
    };

    validateToken();
  }, [authState, navigate]);

  // Render Anteroom only when shouldRender is true
  return shouldRender ? (
    <div className="loading-container">
      <div className="loading-frame">
        <LoadingLayer />
      </div>
    </div>
  ) : null;
};

export default Anteroom;
