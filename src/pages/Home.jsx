import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Navbar
        onItemClick={handleNavbarItemClick}
        selectedIndex={selectedIndex}
      />
      <Main selectedIndex={selectedIndex} />
      <Footer />
    </div>
  );
};
export default Home;
