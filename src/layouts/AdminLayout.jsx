import React, { useEffect } from "react";

import "../components/AdminDashboard/Admin.css";

import Navbar from "../components/AdminDashboard/Navbar";
import Sidebar from "../components/AdminDashboard/Sidebar";
import MainContent from "../components/AdminDashboard/MainContent";
import { useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../redux/userSlice";

const AdminLayout = () => {
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();


  useEffect(() => {
    const accessToken = authState?.accessToken.accessToken;
    dispatch(setAccessToken(accessToken));
  }, [authState])

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="content-wrapper">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
