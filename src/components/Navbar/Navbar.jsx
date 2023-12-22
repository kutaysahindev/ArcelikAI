import React, { useEffect, useState } from "react";
import arclk from "../../assets/arcelik_logo_uzun 1.png";
import "./Navbar.css";
import { useOktaAuth } from "@okta/okta-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut, signUserIn } from "../../redux/userSlice";
import { setIndex } from "../../redux/navIndexSlice";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = ({ onItemClick, selectedIndex }) => {
  const [isPopup, setIsPopup] = useState(false);
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      dispatch(signUserIn());
    } else dispatch(logUserOut());
  }, [authState, dispatch]);

  return (
    <nav id="navbar">
      <div className="logo">
        <img className="" src={arclk} alt="arcelik" />
      </div>
      {location.pathname === "/" ? (
        <div className="steps">
          <div
            onClick={() => dispatch(setIndex(0))}
            className={`step ${nav.index === 0 ? "active" : ""}`}
          >
            Home
          </div>
          <div
            onClick={() => dispatch(setIndex(1))}
            className={`step ${nav.index === 1 ? "active" : ""}`}
          >
            Getting Started
          </div>
          <div
            onClick={() => dispatch(setIndex(2))}
            className={`step ${nav.index === 2 ? "active" : ""}`}
          >
            Prompt Library
          </div>
          <div
            onClick={() => dispatch(setIndex(3))}
            className={`step ${nav.index === 3 ? "active" : ""}`}
          >
            Ethics & Security
          </div>
        </div>
      ) : (
        <h2 className="title">App Creation Wizard</h2>
      )}

      <div className="right-container">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/form" className="">
          Form
        </Link>
        <FaRegCircleUser
          onClick={() => setIsPopup((prev) => !prev)}
          size={25}
        />
        <div className={`popup-container ${isPopup ? "visible" : "hidden"}`}>
          {!user.isSignedIn ? (
            <p className="btn" onClick={() => oktaAuth.signInWithRedirect()}>
              Log in
            </p>
          ) : (
            <p className="btn" onClick={() => oktaAuth.signOut()}>
              Log out
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
