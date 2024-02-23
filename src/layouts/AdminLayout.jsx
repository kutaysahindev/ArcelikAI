import React from "react";

import "../components/AdminDashboard/Admin.css";

import Navbar from "../components/AdminDashboard/Navbar";
import Sidebar from "../components/AdminDashboard/Sidebar";
import MainContent from "../components/AdminDashboard/MainContent";

const AdminLayout = () => {
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
