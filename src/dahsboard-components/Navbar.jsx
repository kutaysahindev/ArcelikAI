import { FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="../public/logo.png" alt="Logo" className="logo" />
      <input type="text" placeholder="Search" className="search-input" />
      <div className="user-info">
        <span className="username">Kutay Şahin</span>
        <FiUser className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
