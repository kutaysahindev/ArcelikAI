// Import the necessary components and modules
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "./oktaConfig";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

// Function to configure and render the main App component
function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const oktaAuth = new OktaAuth(oidcConfig);
  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Security
      {...oktaConfig}
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
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
