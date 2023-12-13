import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react"; // Add this line

import Profile from "./Profile";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-16420108.okta.com/oauth2/default",
  clientId: "0oadroi27bvehMs8M5d7",
  redirectUri: window.location.origin + "/login/callback",
});

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.location.replace(originalUri || window.location.origin);
};

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <div className="App">
          <Navbar
            onItemClick={handleNavbarItemClick}
            selectedIndex={selectedIndex}
          />
          <Main selectedIndex={selectedIndex} />
          <Footer />
          <Routes>
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Security>
    </Router>
  );
}

export default App;
