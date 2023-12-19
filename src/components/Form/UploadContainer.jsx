import React, { useState, useRef } from "react";
import "./UploadContainer.css";

const UploadContainer = ({ handleInputChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    // e.preventDefault();
    setIsDragging(true);
  };

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
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileRemove = (e, index) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    // Add your file upload logic here
    console.log("Uploading files:", files);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("https://example.com/upload", {
        method: "POST",
        body: formData,
      });
      handleInputChange("pdfFiles", files);
      if (response.ok) {
        console.log("Files uploaded successfully!");
        // Add your success handling logic here
      } else {
        console.error("File upload failed:", response.statusText);
        // Add your error handling logic here
      }
    } catch (error) {
      console.error("File upload failed:", error.message);
      // Add your error handling logic here
    }
  };

  return (
    <>
      <p className="form-item-title">Upload PDF Files</p>
      <div
        className={`file-upload ${isDragging ? "dragging" : ""}`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!files.length > 0 ? (
          <div className="">
            {isDragging ? (
              <p className="select">Drop files here</p>
            ) : (
              <p className="select" onClick={selectFiles}>
                Drag and drop files here or Browse
              </p>
            )}
            <input
              className="file-input"
              type="file"
              multiple
              ref={fileInputRef}
              // onChange={(e) => setFiles(e.target.files)}
              onChange={(e) => setFiles((prev) => [...prev, ...e.target.files])}
              // onChange={(e) => setFiles([...files, ...e.target.files])}
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
        <button onClick={handleFileUpload}>Upload Files</button>
      </div>
    </>
  );
};

export default UploadContainer;
