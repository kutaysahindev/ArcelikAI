import { useSelector } from "react-redux";
import ArcelikLoading from "./ArcelikLoading";
import "./LoadingLayer.css";
import { useEffect, useState } from "react";

const LoadingLayer = ({ isApproved, oktaSign }) => {
  const user = useSelector((slices) => slices.user);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (!isApproved && !oktaSign) setStatusText(<p className="message">Redirecting...</p>)
    else if (user.status === "c") setStatusText(<p className="message">Checking...</p>)
    else if (user.status === "s") setStatusText(<p className="message">Signed in <span className="true">successfully</span></p>)
    else setStatusText(<p className="message">Sign-in <span className="false">failed</span></p>)
  }, [user.status])

  //Handles animation status at redirection
  return (
    <div className="loading-container">
      <div className="loading-frame">
        <ArcelikLoading />
      </div>
      {/* { content } */}
      {/* {!isApproved && !oktaSign ? (
        <p className="message">Redirecting...</p>
      ) : user.status === "c" ? (
        <p className="message">Checking...</p>
      ) : user.status === "s" ? (
        <p className="message">
          Signed in <span className="true">successfully</span>
        </p>
      ) : (
        <p className="message">
          Sign-in <span className="false">failed</span>
        </p>
      )} */}
      { statusText }
    </div>
  );
};
export default LoadingLayer;
