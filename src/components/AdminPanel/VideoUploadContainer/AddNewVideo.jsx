import { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import Guidence from "../Guidence";
import VideoUploadContainer from './VideoUploadContainer';
import AdminFooter from '../AdminFooter';

function AddNewVideo() {

    const [files, setFiles] = useState([]);
  
    return (
      <>
        <AdminNavbar/>
        <Guidence title="Add New Video"/>
        <VideoUploadContainer files={files} setFiles={setFiles} />
        <AdminFooter/>
      </>
    );
  }
  
  export default AddNewVideo;