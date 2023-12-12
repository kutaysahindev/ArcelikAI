import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "./oktaConfig";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LoginCallback from "./components/LoginCallback";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  const oktaAuth = new OktaAuth(oktaConfig);

  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <div className="App">
          <Navbar
            onItemClick={handleNavbarItemClick}
            selectedIndex={selectedIndex}
          />
          <Routes>
            <Route path="/" element={<Main selectedIndex={selectedIndex} />} />
            <Route path="/login/callback" element={<LoginCallback />} />
          </Routes>
          <Footer />
        </div>
      </Security>
    </Router>
  );
}

export default App;
