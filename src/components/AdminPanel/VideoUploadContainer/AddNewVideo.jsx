import { useState } from 'react';
import Navbar from "./Navbar";
import Guidence from "./Guidence";
import VideoUploadContainer from './VideoUploadContainer';
import VideoFooter from './VideoFooter';

function AddNewVideo() {

    const [files, setFiles] = useState([]);
  
    return (
      <>
        <Navbar/>
        <Guidence title="Add New Video"/>
        <VideoUploadContainer files={files} setFiles={setFiles} />
        <VideoFooter/>
      </>
    );
  }
  
  export default AddNewVideo;