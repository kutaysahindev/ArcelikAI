import { useSelector } from "react-redux";
import Graph from "./Graphs/Graph.png";
import content1 from "./Graphs/content1.png";
import content2 from "./Graphs/content2.png";
import content3 from "./Graphs/content3.png";
import { QuestionDraft } from "../QuestionDashboard/QuestionDraft";
import { QuestionPool } from "../QuestionDashboard/QuestionPool";

const MainContent = () => {
  const { adminIndex } = useSelector((state) => state.nav);
  let content;
  const gridItems = [
    { title: "Customers", image: content1 },
    { title: "Featured Model", image: content2 },
    { title: "User Analytics", image: content3 },
  ];

  if (adminIndex === "Dashboard") {
    content = (
      <>
        <h1 className="main-heading">Dashboard</h1>
        <div className="grid-item">
          <h2 className="card-heading">User Stats</h2>
          <img src={Graph} alt="" />
        </div>
        <div className="grid-container">
          {gridItems.map((item, index) => (
            <div className="grid-item" key={index}>
              <div className="card">
                <h2 className="card-heading">{item.title}</h2>
                <img src={item.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (adminIndex === "Upload Video") {
    content = "Upload Video";
  }

  if (adminIndex === "Video Pool") {
    content = "Video Pool";
  }

  if (adminIndex === "Question Pool") {
    content = <QuestionPool/>;
  }

  if (adminIndex === "Create Questions") {
    content = <QuestionDraft/>;
  }

  return <div className="main-content">{content}</div>;
};

export default MainContent;
