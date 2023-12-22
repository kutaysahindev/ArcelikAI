import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
// import ArcelikLoading from "../components/Loading/ArcelikLoading";
import { useNavigate } from "react-router-dom";
import LoadingLayer from "../components/Loading/LoadingLayer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut, signUserIn } from "../redux/userSlice";

const Anteroom = () => {
  const { authState } = useOktaAuth();
  const [isApproved, setIsApproved] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((slices) => slices.user);
  const dispatch = useDispatch();

  const approveHandler = async () => {
    const uri = "https://6582f75e02f747c8367abde3.mockapi.io/api/v1/backendApproval";
      axios
      .get(uri)
      .then((res) => setIsApproved(res.data[0].approve))
      .catch((err) => console.error(err.message));
  }

  useEffect(() => {
    approveHandler();
  }, [])

  useEffect(() => {
    if (authState?.isAuthenticated && isApproved) {
      dispatch(signUserIn());
      navigate('/form')
    } else dispatch(logUserOut());
  }, [authState, dispatch, isApproved, navigate]);

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
            // console.error("Unexpected response:", response);
          }
        } else {
          // User not authenticated, render Anteroom
          setShouldRender(true);
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        // Handle error and set shouldRender to true if needed
        setShouldRender(false);
      } finally {
        // Stop loading animation
        setIsLoading(false);
      }
    };

    validateToken();
  }, [authState, navigate]);

  // Render Anteroom only when shouldRender is true
  // return (
  //   <>
  //     {shouldRender ? (
  //       <div className="loading-container">
  //         <div className="loading-frame">
  //           <LoadingLayer />
  //         </div>
  //       </div>
  //     ) : (
  //       <div>başaramadın</div>
  //     )}
  //   </>
  // );
  return !isApproved ? (
    <div className="loading-container">
      <div className="loading-frame">
        <LoadingLayer />
      </div>
    </div>
  ) : <div>Giriş Yapıldı</div>;
};

export default Anteroom;
