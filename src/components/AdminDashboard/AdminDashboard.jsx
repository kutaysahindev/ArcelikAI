import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
// import MainContent from "./MainContent.jsx";
import AddNewVideo from "../AdminPanel/VideoUploadContainer/AddNewVideo.jsx";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="content-wrapper">
          <AddNewVideo />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
