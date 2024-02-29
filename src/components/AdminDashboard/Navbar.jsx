import { FiUser } from "react-icons/fi";
import logo from "../../assets/global.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="admin-logo" />
      <input type="text" placeholder="Search" className="search-input" />
      <div className="user-info">
        <span className="username">Admin User</span>
        <FiUser className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
