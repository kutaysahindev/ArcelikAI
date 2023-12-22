import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import LoadingLayer from "../components/Loading/LoadingLayer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut, signUserIn } from "../redux/userSlice";

const Anteroom = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isApproved, setIsApproved] = useState(null);
  const user = useSelector((slices) => slices.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseHandler = (status) => {
    if (authState?.isAuthenticated && status === 200) {
      setIsApproved(true);
      dispatch(signUserIn());
      setTimeout(() => {
        navigate("/form");
      }, 1500);
    } else {
      setIsApproved(false);
      dispatch(logUserOut());
      setTimeout(() => {
        if(authState?.isAuthenticated) oktaAuth.signOut();
        else navigate("/");
      }, 1500);
    }
  };

  const approveHandler = async () => {
    const endpoint =
      "https://6582f75e02f747c8367abde3.mockapi.io/api/v1/backendApproval";
    axios
      .get(endpoint)
      .then((res) => responseHandler(res.status))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    approveHandler();
  }, []);

  return (
    <>
      <LoadingLayer isApproved={isApproved} />
    </>
  );
};

export default Anteroom;
