import React, { useState } from 'react';
import './Form-2.css';

const Form2 = () => {
  const [useKnowledgebase, setUseKnowledgebase] = useState(false);
  const [enablePDFUpload, setEnablePDFUpload] = useState(false);
  const [fileUploadText, setFileUploadText] = useState('Drop Files to Upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [convRetentionPeriod, setConvRetentionPeriod] = useState('');
  const [modelTemp, setModelTemp] = useState(0.5);

  const handlePDFUpload = (event) => {
    event.preventDefault();
    const newUploadedFiles = Array.from(event.dataTransfer.files).slice(0, 3); // En fazla 3 dosya
    console.log('Files uploaded:', newUploadedFiles);

    setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
    setFileUploadText(`Uploaded Files: ${newUploadedFiles.map(file => file.name).join(', ')}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      useKnowledgebase,
      enablePDFUpload,
      uploadedFiles,
      convRetentionPeriod,
      modelTemp,
    });
    // Diğer submit işlemleri burada gerçekleştirilebilir
  };

  return (
    <div className="form2-container">
      <h2>AI App Wizard</h2>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={useKnowledgebase}
            onChange={() => setUseKnowledgebase(!useKnowledgebase)}
          />
          Use Knowledgebase
        </label>

        <label>
          <input
            type="checkbox"
            checked={enablePDFUpload}
            onChange={() => setEnablePDFUpload(!enablePDFUpload)}
          />
          Enable to Uploading PDF
        </label>
      </div>

      <div
        className="file-upload-container"
        onDragOver={(e) => {
          e.preventDefault();
          setFileUploadText('DROP HERE!');
        }}
        onDragLeave={() => setFileUploadText('Drag and Drop Files to Upload')}
        onDrop={handlePDFUpload}
      >
        {fileUploadText}
        {uploadedFiles.length > 0 && (
          <div>
            <strong>Uploaded Files:</strong>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="conv-retention-period-container">
        <label>Conversational Retention Period (days):</label>
        <input
          type="text"
          className="conv"
          id="convRetentionPeriod"
          value={convRetentionPeriod}
          onChange={(e) => setConvRetentionPeriod(e.target.value)}
        />
        {/* <textarea value={retentionPeriod} readOnly /> */}
      </div>

      <div className="range-slider-container">
        <label>Model Temperature:</label>
        <label class="modelTempTiny">{modelTemp}</label>
        {/* <input
          type="text"
          className="model-value"
          id="modelTemp"
          value={modelTemp}
          onChange={(e) => setModelTemp(e.target.value)}
          readOnly
        /> */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={modelTemp}
          onChange={(e) => setModelTemp(parseFloat(e.target.value))}
        />
      </div>

      <div className="button-container">
        <button className="previous-button">{"<< Previous"}</button>
        <button className="create-button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Form2;
