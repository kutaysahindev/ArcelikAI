import React, { useState } from "react";
import "./ArcelikLoading.css";

export default function ArcelikG2() {
  const [isVisible, setIsVisible] = useState(true);
  function toggleVisibility() {
    setIsVisible((prevVisible) => !prevVisible);
  }
  return (
    <div
      className={`loader ${isVisible ? "visible" : "hidden"}`}
      onClick={toggleVisibility}
    >
      <svg
        id="Layer_1"
        className="arcelik-global2"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 968.89 968.89"
      >
        <rect className="cls-2" x="5" y="5" width="958.89" height="958.89" />
        <path
          className="cls-1"
          d="m719.63,832.73h-167.56l-16.75-119.68h-102.93l-16.76,119.68h-166.36L388.1,136.16h191.51l140.02,696.56Zm-201.07-240.56l-34.7-248.96-34.72,248.96h69.42Z"
        />
      </svg>
    </div>
  );
}
