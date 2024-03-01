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
  FiNavigation,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAdminIndex } from "../../redux/navIndexSlice";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const { adminIndex } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [icons] = useState({
    Dashboard: FiHome,
    "Upload Video": FiVideo,
    "Video Pool": FiInbox,
    "Create Questions": FiEdit,
    "Question Pool": FiList,
    "Cloud Pricing": FiCloud,
    "To-Do": FiTag,
    "Client App": FiNavigation,
    Settings: FiSettings,
    Logout: FiLogOut,
  });

  const sidebarItems = [
    "Dashboard",
    "Upload Video",
    "Video Pool",
    "Create Questions",
    "Question Pool",
    "Cloud Pricing",
    "To-Do",
    "Settings",
    "Client App",
    "Logout",
  ];

  const handleItemClick = (item) => {
    dispatch(setAdminIndex(item));

    if (item === "Client App") {
      navigate("/home");
    }
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
              } ${adminIndex === item ? "selected" : ""}`}
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
