import { FaCog } from "react-icons/fa";
import "./Settings.css";

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <FaCog className="settings-icon" />
        <h2 className="settings-title">AI Wizard Settings</h2>
      </div>
      <div className="settings-options">
        <div className="setting-option">
          <label className="setting-label">Language:</label>
          <select className="setting-dropdown">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="setting-option">
          <label className="setting-label">Display Mode:</label>
          <select className="setting-dropdown">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="setting-option">
          <label className="setting-label">Training Data Source:</label>
          <input
            type="text"
            className="setting-input"
            placeholder="Enter data source URL"
          />
        </div>
        <div className="setting-option setting-center">
          <label className="setting-label">Enable Advanced Settings:</label>
          <input type="checkbox" className="setting-checkbox" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
