import React from 'react';
import './loginSuccesful.css';
import reportWebVitals from './reportWebVitals';


const App = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <img className="logo" src={process.env.PUBLIC_URL + '/assets/arcelik_logo_uzun 1.png'} alt="Logo" width="160" height="40"/>
      </header>

      {/* Content */}
      <div className="content-container">
        <div className="content-box" >
          <img src={process.env.PUBLIC_URL + '/assets/succes.png'} alt="succes-image" width="150" height="150" />
          <h2 className="login">Login Successful</h2>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="arcelik-ai">2023 - Arçelik AI</div>
      </footer>
    </div>
  );
};

export default App;

reportWebVitals();

