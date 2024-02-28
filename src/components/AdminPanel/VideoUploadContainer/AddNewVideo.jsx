import Guidence from "../Guidence";
import { VideoUploadContainer } from "./VideoUploadContainer";


function AddNewVideo() {

  
    return (
      <div className='container'>
        <Guidence title="Add New Video"/>
        <VideoUploadContainer />
      </div>
    );
  }
  
  export default AddNewVideo;