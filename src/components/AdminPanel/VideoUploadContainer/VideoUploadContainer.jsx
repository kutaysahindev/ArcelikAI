import { useState, useRef } from "react";
import "./VideoUploadContainer.css";
import { uploadVideos } from "../../../api";
import { useSelector } from "react-redux";
import { toast, Toaster } from 'react-hot-toast';

export const VideoUploadContainer = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null); // Tek bir video dosyası
  const [selectedVideo, setSelectedVideo] = useState(null); // Silinecek video
  const [isDragging, setIsDragging] = useState(false); // Drag and drop durumu
  const fileInputRef = useRef(null); // Dosya girişi için referans

  const [duration, setDuration] = useState(null);

  const user = useSelector((state) => state.user);

  // Drag and drop bölgesine dosya bırakıldığında
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles && droppedFiles.length > 0) {
      const mp4Files = droppedFiles.filter(isMP4Video);
      if (mp4Files.length > 0) {
        // Sadece bir video dosyası alınacak
        setVideoFile(mp4Files[0]);
      } else {
        alert("You can only upload a MP4 file.");
      }
    }
  };

  // Seçilen dosyanın MP4 formatında olup olmadığını kontrol eder
  const isMP4Video = (file) => {
    return file.type === "video/mp4";
  };

  // Dosya yükleme işlemi için
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isMP4Video(selectedFile)) {
      setVideoFile(selectedFile);
      console.log(selectedFile);
      const video = document.createElement("video");
      video.src = URL.createObjectURL(selectedFile); // Set the video source
      video.onloadedmetadata = () => {
        setDuration(parseInt(video.duration));
        // console.log("Video duration:", parseInt(video.duration));
      };
      // Append the video element to the document
      document.body.appendChild(video);
    } else {
      alert("You can only upload an MP4 file.");
    }
  };

  // Dosyanın kaldırılması için
  const handleRemoveVideo = (file, event) => {
    event.preventDefault(); // Butona tıklanınca varsayılan davranışı engeller
    setSelectedVideo(file);
  };

  // Dosyanın kaldırılmasını onaylama
  const confirmRemoveVideo = () => {
    if (selectedVideo) {
      setVideoFile(null);
      setSelectedVideo(null);
    }
  };

  // const handleTitle = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setVideoFile(e.target.files[0]);
  //   }
  // };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // Formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast('Please select a video file', {
        icon:'📁',
        style: {
        border: '3px solid #cc1526',
        padding: '16px',
        color: 'white',
        backgroundColor: 'rgb(230, 69, 69)',
        fontSize: "14px",
        marginLeft: "13rem",
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    console.log({ title });
    formData.append("Video", videoFile, videoFile.name);
    console.log({ videoFile }, videoFile.name);
    formData.append("DurationInSeconds", duration);
    console.log("yollanan durasyon: ", duration);

    try {
      await uploadVideos(user.accessToken, formData);

      console.log("Video uploaded successfully");
      console.log("formData: ", formData);
      setTitle("");
      setVideoFile(null);
      setDuration(null);
    } catch (error) {
      toast.error('Error Uploading Video', {
        style: {
        border: '2px solid #cc1526',
        padding: '16px',
        color: '#cc1526',
        fontSize: "14px",
      },
      iconTheme: {
        primary: '#cc1526',
        secondary: '#FFFAEE',
      },
    });
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="form-area">
      <form onSubmit={handleSubmit}>
        <div className="dnd-bar">
          <label htmlFor="videoFile" className="page-title">
            Choose an MP4 File:
          </label>

          <div
            className="drag-drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              accept=".mp4"
            />
            <h2 className="up-text">Drag and Drop Area</h2>
            <p className="down-text">Drag and drop MP4 files here or Browse.</p>
          </div>
        </div>
        <div className="video-remove-bar">
          {videoFile && (
            <div className="file-list">
              <ul>
                <li className="span-btn">
                  <span className="span">{videoFile.name}</span>
                  <button
                    className="first-remove-btn"
                    onClick={(event) => handleRemoveVideo(videoFile, event)}
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          )}
          {selectedVideo && (
            <div className="video-remove-modal">
              <h2 className="confirm-text">
                Are you sure you want to remove {selectedVideo.name}?
              </h2>
              <button className="remove-confirm" onClick={confirmRemoveVideo}>
                Remove
              </button>
              <button
                className="remove-cancel"
                onClick={() => setSelectedVideo(null)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="title-bar">
          <label htmlFor="title" className="video-head">
            Video Title:
          </label>
          <input
            type="text"
            id="video-title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="add-to-pool-container">
          <button
            type="submit"
            className="add-to-pool-btn"
            onClick={handleSubmit}
          >
            Add to All Videos
          </button>
        </div>
      </form>
    </div>
  );
};
