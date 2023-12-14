import React, { useState } from 'react';
import './Tabs.css'; // Import your CSS file for styling

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabCount = 3;

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </div>
        <div
          className={`tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </div>
        <div
          className={`tab ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabClick(3)}
        >
          Tab 3
        </div>
        {/* Add more tabs as needed */}
      </div>
      <div className="barc">
        <div
          className="active-tab-bar"
          style={{
            left: `${(activeTab - 1) * 33.33}%`,
            width: `${100 / tabCount}%`,
          }}
        ></div>
      </div>
      {/* Adjust the percentage based on the number of tabs */}
    </div>
  );
};

export default Tabs;
