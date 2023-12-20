import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayout.css";

import Navbar from '../components/Navbar/Navbar.jsx';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}
