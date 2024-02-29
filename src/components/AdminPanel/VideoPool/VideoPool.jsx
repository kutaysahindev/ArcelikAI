import { useState, useEffect } from 'react';
import './VideoPool.css';
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { fetchVideoNamesFromDatabase, updateVideoDetailsInDatabase } from '../../../api';
import { deleteVideoFromDatabase } from '../../../api';
import { useSelector } from 'react-redux';



const VideoPool = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const videosPerPage = 10; 
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const user = useSelector((slices) => slices.user);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoNames = await fetchVideoNamesFromDatabase(user.accessToken);
        setAllVideos(videoNames);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // video list of current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // change page number
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // video deleting func
  const handleDelete = async (index) => {
    try {
      const videoToDelete = allVideos[index];
      await deleteVideoFromDatabase(user.accessToken, videoToDelete.Id);
      // if deleting is successful then remove the video name from the list
      const updatedVideos = [...allVideos];
      updatedVideos.splice(indexOfFirstVideo + index, 1);
      setAllVideos(updatedVideos);

      // pagination devre dışı old. için işe yaramaz
      // if (currentVideos.length === 1 && currentPage > 1) {
      //   setCurrentPage(currentPage - 1);
      // }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  useEffect(() => {
    console.log('editedName: ', editedName)
    console.log('allVideos: ', allVideos)
  }, [editedName, allVideos])


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedName(allVideos[index].Title);
  };

  const handleSaveEdit = async(index) => {
    const updatedVideos = [...allVideos];
    updatedVideos[index].Title = editedName;
    setAllVideos(updatedVideos);
    setEditingIndex(-1);
    const formData = new FormData()
    formData.append("Title", editedName)
    try {
      await updateVideoDetailsInDatabase(user.accessToken, formData, allVideos[index].Id)
    } catch (error) {
      console.error(error.message)
    }
  };

  return (
    <div className='Container'>
      <div className='titles'>
        <h1 className='first-title'>All Videos</h1>
        <h2 className='second-title'>View and browse all videos, edit video details, secure video deletion. All in one.</h2>
      </div>
      <div className="video-pool">
        <div className="video-list">
          {allVideos.map((video, index) => (
            <div className="video-item" key={index}>
              {editingIndex === index ? (
                <div className="edit-container">
                  <input
                    className='input-field'
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <IoCheckmarkOutline 
                    className="done-icon"
                    size='1.7rem'
                    cursor='pointer'
                    onClick={() => handleSaveEdit(index)}
                  />
                </div>
              ) : (
                <span>{video.Title}</span>
              )}
              <div className="item-pack">
                <CiEdit
                  className='item'
                  size='1.7rem'
                  cursor='pointer'
                  onClick={() => handleEdit(index)}
                />
                <CiTrash
                  className='item-2'
                  size='1.7rem'
                  cursor='pointer'
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="pagination">
          {[...Array(Math.ceil(allVideos.length / videosPerPage)).keys()].map((number) => (
            <div key={number} onClick={() => paginate(number + 1)} className="page-number">
              {number + 1}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default VideoPool;
