import { useState } from 'react';
import './HtmlSelect.css';

export const HtmlSelect = ({ questionTypes }) => {
  const [selectedType, setSelectedType] = useState(questionTypes[0]);

  const handleSelectionChange = (event) => {
    console.log('event.target.value: ', selectedType);
    const One = questionTypes.find((f) => f.value === event.target.value);
    setSelectedType(One);
  };
  return (
    <div className="select-item">
      <select
        className="qt-select"
        value={selectedType.value}
        onChange={handleSelectionChange}
      >
        {questionTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <label htmlFor="questionType">Question Type</label>
    </div>
  );
};
