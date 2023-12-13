import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [appName, setAppName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleModelSelection = (model) => {
    // if the button is already select it, deselect it.
    if (selectedModel === model) {
      setSelectedModel('');
    } else {
      // otherwise select the button.
      setSelectedModel(model);
    }
  };

  const handleSubmit = (event) => {
    // stops the form's normal submit process
    event.preventDefault();
    // Form submit logic
    console.log('Form submitted:', { appName, welcomeMessage, systemPrompt, selectedModel });
  };

  return (
    <div className="form-container">
      <h2>AI Platform App Creation Wizard</h2>
      <div className="form-section">
        <label class="midtext" htmlFor="appName">Application Name</label>
        <input
          type="text"
          id="appName"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
      </div>
      <div className="form-section">
        <label class="midtext" htmlFor="welcomeMessage">Welcome Message</label>
        <textarea
          id="welcomeMessage"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />
      </div>
      <div className="form-section">
        <label class="midtext" htmlFor="systemPrompt">System Prompt</label>
        <textarea
          id="systemPrompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
      <div className="model-section">
        <h3>Choose a Model</h3>
        <div className="model-buttons">
          {['GPT-3.5', 'GPT-3.5 16K', 'GPT-4', 'GPT-4 Turbo', 'Stable Diffusion', 'LLAMA2'].map(
            (model) => (
              <button
                key={model}
                className={selectedModel === model ? 'selected' : ''}
                onClick={() => handleModelSelection(model)}
              >
                {model}
              </button>
            )
          )}
        </div>
      </div>
      <div className="form-section">
        <button className="submit-button" onClick={handleSubmit}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Form;
