import React from "react";
import "./loginSuccesful.css";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <img
          class="logo"
          src={process.env.PUBLIC_URL + "/assets/arcelik_logo_uzun 1.png"}
          alt="Logo"
          width="160"
          height="40"
        />
      </header>

      {/* Content */}
      <div class="content-container">
        <div class="content-box">
          <img
            src={process.env.PUBLIC_URL + "/assets/succes.png"}
            alt="success"
            width="150"
            height="150"
          />
          <h2 class="login">Login Successful</h2>
        </div>
      </div>

      {/* Footer */}
      <footer class="footer">
        <div class="arcelik-ai">2023 - Arçelik AI</div>
      </footer>
    </div>
  );
};

export default App;

reportWebVitals();
