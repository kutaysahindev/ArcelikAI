import React, { useState, useRef, useEffect } from 'react';
import './UploadContainer.css';

const UploadContainer = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHover, setIsHover] = useState(false)
  // const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  // const handleDragEnter = (e) => {
  //   // e.preventDefault();
  //   setIsDragging(true);
  // };

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
    // setFiles()
  };

  const handleFileRemove = (e, index) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // useEffect(() => {
  //   console.log('files: ', files)
  // }, [files])
  
  return (
    <div
      className={`file-upload ${isDragging ? 'dragging' : ''}`}
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
              Drag and drop files here or <span className={`${isHover ? "highlight" : ""}`}>Browse</span>
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
          {/* <li>{ files[0].name }</li> */}
        </ul>
      )}
      {/* <button onClick={handleFileUpload}>Upload Files</button> */}
    </div>
  );
};

export default UploadContainer;
