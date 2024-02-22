import { useState } from 'react';
import './VideoPool.css';
import { CiEdit, CiTrash } from "react-icons/ci";

const VideoPool = () => {
  const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa numarası
  const videosPerPage = 10; // Sayfa başına gösterilecek video sayısı

  // Tüm video isimlerinin bir listesi (örneğin, veritabanından alınabilir)
  const [allVideos, setAllVideos] = useState([
    'Video 1 ',
    'Video 2 ',
    'Video 3 ',
    'Video 4 ',
    'Video 5 ',
    'Video 6 ',
    'Video 7 ',
    'Video 8 ',
    'Video 9 ',
    'Video 10',
    'Video 11',
    'Video 12',
    'Video 13',
    'Video 14',
    'Video 15',
    'Video 16',
    'Video 17',
    'Video 18',
    'Video 19',
    'Video 20',
    // Daha fazla video ekleyebilirsiniz
  ]);

  // Aktif sayfadaki video listesi
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Sayfa numarasını değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Video silme fonksiyonu
  const handleDelete = (index) => {
    const updatedVideos = [...allVideos];
    updatedVideos.splice(indexOfFirstVideo + index, 1); // Doğru indeksi silmek için indexOfFirstVideo'e ekleyin
    setAllVideos(updatedVideos);
    // Eğer silinen son video son sayfadaysa, sayfayı bir azaltın
    if (currentVideos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='Container'>
      <div className='titles'>
        <h1 className='first-title'>Video Pool</h1>
        <h2 className='second-title'>View and browse all videos, edit video details, secure video deletion. All in one.</h2>
      </div>
      <div className="video-pool">
        <div className="video-list">
          {currentVideos.map((video, index) => (
            <div className="video-item" key={index}>
              {video}
              <CiEdit className='item' size='1.2rem' cursor='pointer' />
              <CiTrash className='item-2' size='1.2rem' cursor='pointer' onClick={() => handleDelete(index)} />
            </div>
          ))}
        </div>
        <div className="pagination">
          {/* Sayfa numaralarını oluştur */}
          {[...Array(Math.ceil(allVideos.length / videosPerPage)).keys()].map((number) => (
            <div key={number} onClick={() => paginate(number + 1)} className="page-number">
              {number + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPool;

// When we'll handle database connection:

// import React, { useState, useEffect } from 'react';

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetch('/api/videos')
//       .then(response => response.json())
//       .then(data => setVideos(data))
//       .catch(error => console.error('Veri alınırken hata oluştu:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Video Listesi</h2>
//       <ul>
//         {videos.map((video, index) => (
//           <li key={index}>{video.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VideoList;
