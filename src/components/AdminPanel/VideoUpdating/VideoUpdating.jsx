import { useState, useRef } from 'react';
import './VideoUpdating.css';
// import { useHistory, useNavigate } from 'react-router-dom';
import './ChangeExistingVideo';
import { updateVideoDetailsInDatabase } from "../../../api.jsx";

const VideoUpdating = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState(''); 

  const isMP4Video = (file) => {
    return file.type === 'video/mp4';
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

    if (droppedFiles && droppedFiles.length > 0) {
      const mp4Files = droppedFiles.filter(isMP4Video);
      if (mp4Files.length > 0) {
        // MP4 dosyalarını işleme al
        handleFiles(mp4Files);
      } else {
        alert("Lütfen sadece MP4 formatındaki videoları yükleyin.");
      }
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isMP4Video(selectedFile)) {
      handleFiles([selectedFile]);
    } else {
      alert("Lütfen sadece MP4 formatındaki videoları seçin.");
    }
  };

  const handleRemoveVideo = (file) => {
    setSelectedVideo(file);
  };

  const confirmRemoveVideo = () => {
    const newFiles = files.filter((f) => f !== selectedVideo);
    setFiles(newFiles);
    setSelectedVideo(null);
  };

  const handleVideoTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleVideoChange = async () => {
    // Değiştirilmiş video detaylarını bir obje içinde toplayın
    const updatedVideoDetails = {
        title: videoTitle,
        // Diğer video detaylarını da ekleyebilirsiniz
    };

    try {
        // API çağrısı yaparak veritabanına güncellenmiş video detaylarını gönderin
        const response = await updateVideoDetailsInDatabase(updatedVideoDetails);
        // Başarılı bir şekilde güncellendiğinde kullanıcıya bilgi verebilirsiniz
        console.log('Video details updated successfully:', response);
    } catch (error) {
        // Hata durumunda kullanıcıya bir hata mesajı gösterebilirsiniz
        console.error('Error updating video details:', error);
    }
};

  const handleFiles = (newFiles) => {
    if (files.length === 0) {
      setFiles(newFiles.slice(0, 1)); 
    } else {
      alert("You can only upload 1 video.");
    }
  };

    return ( 

        <div className='video-container'>
            {/* <div className='info'>
                <img className="i-symbol" src={info}></img>
            </div> */}
            <h1 className='page-title'>Choose MP4 Files</h1>
            <div className="drag-drop-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
            >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept=".mp4"
            />
            <h2 className='up-text'>Drag and Drop Area</h2>
            <p className='down-text'>Drag and drop MP4 files here or Browse.</p>
            </div>
            {files.length > 0 && (
                <div className="file-list">
                    {/* <h3>Uploaded Files:</h3> */}
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <span>{file.name}</span>
                                <button className="first-remove-btn" onClick={() => handleRemoveVideo(file)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedVideo && (
                <div className="video-remove-modal">
                    <h2 className='confirm-text'>Are you sure you want to remove "{selectedVideo.name}"?</h2>
                    <button className="remove-confirm" onClick={() => confirmRemoveVideo()}>Remove</button>
                    <button className="remove-cancel" onClick={() => setSelectedVideo(null)}>Cancel</button>
                </div>
            )}
                <div className="video-title-container">
                    <label htmlFor="video-title" className='video-head'>Video Title:</label>
                    <input type="text" id="video-title" placeholder='ect: First Training Video' value={videoTitle} onChange={handleVideoTitleChange} />
                </div>

                 <div className="change-container">
                    <button type='submit' className="change-ex-btn" onClick={handleVideoChange}>Change Existing Video</button>
                </div>
        </div>
    );
};

export default VideoUpdating;
