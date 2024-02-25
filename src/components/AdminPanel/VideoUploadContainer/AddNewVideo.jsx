import { useState } from 'react';
// import AdminNavbar from '../AdminNavbar';
import Guidence from "../Guidence";
import VideoUploadContainer from './VideoUploadContainer';
// import AdminFooter from '../AdminFooter';

function AddNewVideo() {

    const [files, setFiles] = useState([]);
  
    return (
      <div className='container'>
        <Guidence title="Add New Video"/>
        <VideoUploadContainer files={files} setFiles={setFiles} />
      </div>
    );
  }
  
  export default AddNewVideo;