import React, { useEffect, useState } from "react";
import "./Main.css";

const contentList = [
  {
    title: "Arçelik AI Platform",
    content:
      "Elevate your success with AI magic: effortlessly craft applications with the AI Wizard, proudly backed by Arçelik's innovation.",
  },
  {
    title: "Arçelik AI Platform",
    content: `
    Login with Okta: Begin your journey by signing in for an Arçelik AI Wizard account.

    Explore the Wizard: Dive into the intuitive interface of the AI Wizard. Explore its features, understand its capabilities, and witness firsthand how AI can transform your development process.
    Craft Your Magic: Start crafting your applications effortlessly. Leverage the power of AI to enhance functionality, streamline processes, and bring your ideas to life. 
    
    Get ready to witness the magic of Arçelik's AI Wizard – where innovation meets simplicity. Elevate your success, one application at a time.`,
  },
  {
    title: "Arçelik AI Platform",
    content: `conditional renderla 4 madde gelecek buraya`,
  },
  {
    title: "Arçelik AI Platform",
    content: `At Arçelik, we prioritize ethics and security in AI development:

    User Privacy: We safeguard user data, adhering to strict privacy standards.
    Transparency: Our algorithms are transparent, fostering trust and understanding.
    Bias Mitigation: We actively work to mitigate biases, promoting fairness in our models.
    Robust Security: Your data's security is non-negotiable; we employ robust measures against threats.
    Ongoing Compliance: We adhere to global ethical standards and ensure compliance with regulations, continuously updating to address emerging considerations. Trust in Arçelik AI Wizard for responsible and secure AI innovation.`,
  },
];

const Main = ({ selectedIndex }) => {
  // const [animationClass, setAnimationClass] = useState("");
  
  const isValidIndex = selectedIndex >= 0 && selectedIndex < contentList.length;

  const contentStyles = {
    fontSize: isValidIndex && selectedIndex === 0 ? "2.2rem" : "1.5rem",
  };

  // useEffect(() => {
  //   if (isValidIndex) {
  //     setAnimationClass(
  //       selectedIndex === 0 ? "animate-login" : "animate-other"
  //     );
  //   }
  // }, [selectedIndex, isValidIndex]);

  return (
    <div className="main-container">
      {isValidIndex && (
        <div>
          <p className={`main-title ${(isValidIndex && selectedIndex === 0) ? "animate-login" : "animate-other"}`}>
            {contentList[selectedIndex].title}
          </p>
          <p className="main-text" style={contentStyles}>
            {contentList[selectedIndex].content}{" "}
          </p>
          {selectedIndex === 0 && (
            <button className="login-button">Login with Okta</button>
          )}
        </div>
      )}
      {!isValidIndex && <p className="main-content">Invalid index selected</p>}
    </div>
  );
};

export default Main;
