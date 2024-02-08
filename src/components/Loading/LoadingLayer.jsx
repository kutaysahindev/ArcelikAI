import { useSelector } from "react-redux";
import ArcelikLoading from "./ArcelikLoading";
import "./LoadingLayer.css";

const LoadingLayer = ({ isApproved, oktaSign }) => {
  const user = useSelector((slices) => slices.user);

  //Handles animation status at redirection
  return (
    <div className="loading-container">
      <div className="loading-frame">
        <ArcelikLoading />
      </div>
      {/* { content } */}
      {!isApproved && !oktaSign ? (
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
      )}
    </div>
  );
};
export default LoadingLayer;
