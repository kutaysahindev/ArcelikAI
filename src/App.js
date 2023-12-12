import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-16420108.okta.com/oauth2/default",
  clientId: "0oadroi27bvehMs8M5d7",
  redirectUri: window.location.origin + "/login/callback",
});

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(
      toRelativeUrl(originalUri || "/", window.location.origin)
    );
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <div className="App">
        <Navbar
          onItemClick={handleNavbarItemClick}
          selectedIndex={selectedIndex}
        />
        <Main selectedIndex={selectedIndex} />
        <Footer />
      </div>
    </Security>
  );
}

export default App;
