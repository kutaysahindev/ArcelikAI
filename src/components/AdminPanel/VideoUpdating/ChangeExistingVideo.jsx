import { useState } from 'react';
import Navbar from "./Navbar";
import Guidence from "./Guidence";
import VideoUpdating from "./VideoUpdating";
import VideoFooter from './VideoFooter';

function ChangeExistingVideo() {

    const [files, setFiles] = useState([]);
    
  
    return (
      <>
        <Navbar/>
        <Guidence title="Change Existing Video"/>
        <VideoUpdating files={files} setFiles={setFiles} />
        <VideoFooter/>
      </>
    );
  }
  
  export default ChangeExistingVideo;