import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayout.css";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="page-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
