import { useState } from "react";
import "./Questions.css";
import { RxInput } from "react-icons/rx";

export const OpenEndedQ = ({ question }) => {
  const [response, setResponse] = useState("");
  return (
    <div className="question open-ended">
      <RxInput size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <input onChange={(e) => setResponse(e.target.value)}/>
      </div>
      {/* <p>response: { response }</p> */}
    </div>
  )
}