import { useSelector } from "react-redux";
import { QuestionDraft } from "../QuestionDashboard/QuestionDraft";
import { QuestionPool } from "../QuestionDashboard/QuestionPool";
import AddNewVideo from "../AdminPanel/VideoUploadContainer/AddNewVideo";
import VideoManagement from "../AdminPanel/VideoManagement";
import CloudPricing from "./Tabs/CloudPricing/CloudPricing";
import ToDoList from "./Tabs/ToDoList/ToDoList";
import Settings from "./Tabs/Settings/Settings";
import Graph1 from "./Graphs/Graph1";
import Graph2 from "./Graphs/Graph2";
import Graph3 from "./Graphs/Graph3";
import Graph4 from "./Graphs/Graph4";

const MainContent = () => {
  const { adminIndex } = useSelector((state) => state.nav);
  let content;
  const gridItems = [
    { title: "Customers", source: <Graph2 /> },
    { title: "Featured Model", source: <Graph3 /> },
    { title: "User Analytics", source: <Graph4 /> },
  ];

  if (adminIndex === "Dashboard") {
    content = (
      <>
        <h1 className="main-heading">Dashboard</h1>
        <div className="grid-item-admin">
          <h2 className="card-heading">User Stats</h2>
          {<Graph1 />}
        </div>
        <div className="grid-container">
          {gridItems.map((item, index) => (
            <div className="grid-item-admin" key={index}>
              <div className="card">
                <h2 className="card-heading">{item.title}</h2>
                {item.source}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (adminIndex === "Upload Video") {
    content = <AddNewVideo />;
  }

  if (adminIndex === "Video Pool") {
    content = <VideoManagement />;
  }

  if (adminIndex === "Question Pool") {
    content = <QuestionPool />;
  }

  if (adminIndex === "Create Questions") {
    content = <QuestionDraft />;
  }

  if (adminIndex === "Cloud Pricing") {
    content = <CloudPricing />;
  }

  if (adminIndex === "To-Do") {
    content = <ToDoList />;
  }

  if (adminIndex === "Settings") {
    content = <Settings />;
  }

  return <div className="main-content">{content}</div>;
};

export default MainContent;
