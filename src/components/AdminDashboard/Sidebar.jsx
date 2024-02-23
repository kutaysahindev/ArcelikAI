import { useState } from "react";

import {
  FiHome,
  FiVideo,
  FiInbox,
  FiSettings,
  FiLogOut,
  FiList,
  FiCloud,
  FiEdit,
  FiTag,
} from "react-icons/fi";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const [icons] = useState({
    Dashboard: FiHome,
    "Video Dashboard": FiVideo,
    Inbox: FiInbox,
    "Create Questions": FiEdit,
    "Question Pool": FiList,
    "Cloud Pricing": FiCloud,
    "To-Do": FiTag,
    Settings: FiSettings,
    Logout: FiLogOut,
  });

  const sidebarItems = [
    "Dashboard",
    "Video Dashboard",
    "Inbox",
    "Create Questions",
    "Question Pool",
    "Cloud Pricing",
    "To-Do",
    "Settings",
    "Logout",
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {sidebarItems.map((item, index) => {
          const Icon = icons[item];
          return (
            <li
              key={index}
              className={`sidebar-item ${
                index === sidebarItems.length - 2 ? "sidebar-item-last" : ""
              } ${selectedItem === item ? "selected" : ""}`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleItemClick(item)}
              >
                {Icon && <Icon className="icon" />} {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
