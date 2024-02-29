import  { useState, useRef } from "react";
import "./UploadContainer.css";
import { useSelector } from "react-redux";


const UploadContainer = ({ files, setFiles }) => {

  const [isDragging, setIsDragging] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef(null);
  const { SupportedFileTypes } = useSelector((state) => state.settings);
  const selectFiles = () => {
    fileInputRef.current.click();
  };

  //File upload handling w/ drag&drop events

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    // Filter out non-PDF files
    const pdfFiles = droppedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    setFiles([...files, ...pdfFiles]);
  };

  const handleFileRemove = (e, index) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileInputChange = (e) => {
    // Filter out non-PDF files
    const pdfFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  return (
    <div
      className={`file-upload ${isDragging ? "dragging" : ""}`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!files?.length > 0 ? (
        <div className="">
          {isDragging ? (
            <p className="select bold">Drop files here</p>
          ) : (
            <p className="select" onClick={selectFiles}>
              Drag and drop PDF files here or 
              <span className={`${isHover ? "highlight" : ""}`}>Browse</span>
            </p>
          )}
          <input
            className="file-input"
            type="file"
            accept={
              SupportedFileTypes.includes(",")
                ? SupportedFileTypes.map((t) => `.${t}`).join(", ")
                : `.${SupportedFileTypes}`
            }
            multiple
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <button onClick={(e) => handleFileRemove(e, index)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadContainer;
