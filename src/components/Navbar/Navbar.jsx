import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuLogOut, LuLogIn } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import arclk from "../../assets/global.png";
import "./Navbar.css";
import { useOktaAuth } from "@okta/okta-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../redux/navIndexSlice";
import { logUserOut, setIsLoading } from "../../redux/userSlice";

const Navbar = () => {
  const [isPopup, setIsPopup] = useState(false);
  const nav = useSelector((slices) => slices.nav);
  const user = useSelector((slices) => slices.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const { authState, oktaAuth } = useOktaAuth();

  return (
    <nav id="navbar">
      <div className="logo">
        <img className="" src={arclk} alt="arcelik" />
        {/* <p>Arçelik</p> */}
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
      ) : location.pathname === "/home/form" ? (
        <h2 className="title">App Creation Wizard</h2>
      ) : location.pathname === "/home/anteroom" ? (
        <h2 className="title">Signing You In</h2>
      ) : (
        <h2 className="title"> </h2>
      )}

      <div className="right-container">
        <Link to="/home" className="">
          Home
        </Link>
        {user.isSignedIn && (
          <Link to="/home/form" className="">
            Form
          </Link>
        )}
        <FaRegCircleUser
          className="icon"
          size={25}
          onClick={() => setIsPopup((prev) => !prev)}
        />
        <div className={`popup-container ${isPopup ? "visible" : "hidden"}`}>
          {"if the user is admin" && (
            <p
            className="btn"
            onClick={() => navigate("/admin")}
          >
            <GrUserAdmin />
            Admin Page
          </p>
          )}
          {!user.isSignedIn ? (
            <p
              className="btn"
              onClick={() => {
                oktaAuth.signInWithRedirect();
                dispatch(setIsLoading(true));
              }}
            >
              <LuLogIn />
              Log in
            </p>
          ) : (
            <div className="logout">
              <p className="info">{user.userInfo.name}</p>
              <p className="info">{user.userInfo.email}</p>
              <p className="btn" onClick={() => {
                oktaAuth.signOut()
                dispatch(logUserOut());
              }}>
                <LuLogOut />
                Log out
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
