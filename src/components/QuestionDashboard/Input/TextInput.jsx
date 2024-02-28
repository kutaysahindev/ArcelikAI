// import { useState } from 'react';
import './FancyInput.css';
export const TextInput = ({ type, label, max, limit, value, setValue }) => {
  // const [text, setText] = useState('');

  const lowerLabel = label.toLowerCase();
  return (
    <div className={`fancy-input ${"fi-"+lowerLabel}`}>
      <input
        type={type}
        id={lowerLabel}
        max={max}
        maxLength={limit}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <label htmlFor={lowerLabel}>{label}</label>
    </div>
  );
};
