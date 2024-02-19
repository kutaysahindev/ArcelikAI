import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import './Dropdown.css';

export const Dropdown = ({
  label,
  options,
  selected,
  selector,
  z,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectionChange = (event) => {
    console.log('event.target.value: ', selected);
    const One = options.find((f) => f.value === event.target.value);
    selector(One);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectorOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="border" >
      <div
        className={`select-container ${isSelectorOpen ? 'expand' : ''}`}
        onClick={() => setIsSelectorOpen((prev) => !prev)}
        ref={dropdownRef}
      >
        <div
          className={`qt-selector ${isSelectorOpen ? 'open' : ''}`}
          value={selected.value}
          onChange={handleSelectionChange}
          style={{ zIndex: 2 + z }}
        >
          {selected.label}
          <span className={`icon ${isSelectorOpen ? 'open' : ''}`}>
            <FaChevronDown />
          </span>
        </div>
        <div
          className={`qt-options ${isSelectorOpen ? 'expand' : ''}`}
          style={{ zIndex: 1 + z }}
        >
          {options.map((type) => (
            <div
              className="qt-option"
              key={type.value}
              onClick={() => selector(type)}
            >
              {type.label}
            </div>
          ))}
        </div>
      </div>
      <label
        className={`qt-label ${isSelectorOpen ? 'open' : ''}`}
        htmlFor="questionType"
        style={{ zIndex: 3 + z }}
      >
        {label}
      </label>
    </div>
  );
};
