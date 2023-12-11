import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavbarItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="App">
      <Navbar onItemClick={handleNavbarItemClick} selectedIndex={selectedIndex} />
      <Main selectedIndex={selectedIndex} />
      <Footer />
    </div>
  );
}

export default App;
