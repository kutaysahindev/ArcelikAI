import { VideoUploadContainer } from "./VideoUploadContainer";
import { toast, Toaster } from "react-hot-toast";

function AddNewVideo() {
  return (
    <div className="container">
      <Toaster position="top-center"/>
      <VideoUploadContainer />
    </div>
  );
}

export default AddNewVideo;
