import React from 'react';
import './style.css';
import reportWebVitals from './reportWebVitals';


const App = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <img class="logo" src={process.env.PUBLIC_URL + '/image/arcelik-logo.png'} alt="Logo" width="160" height="40"/>
      </header>

      {/* Content */}
      <div class="content-container">
        <div class="content-box" >
          <img src={process.env.PUBLIC_URL + '/image/succes.png'} alt="succes-image" width="150" height="150" />
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

