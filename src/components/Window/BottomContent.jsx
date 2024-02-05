import { FaCheckCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { IoIosPaperPlane } from "react-icons/io";
import { useSelector } from "react-redux";

const BottomContent = () => {
  const { allCompleted } = useSelector(state => state.video)
  const { result } = useSelector(state => state.quiz)
  const bottomContentData = [
    {
      title: "Video Course",
      icon: <FaPlayCircle className="icon" size={30}/>,
      condition: allCompleted,
      description:
        "Easily adapt to the latest changes of AI World and learn to use Arcelik’s one of the best AI tools to create your own AI Companion.",
    },
    {
      title: "Quiz",
      icon: <FaPenNib className="icon" size={30}/>,
      condition: (result === "passed"),
      description:
        "Test your knowledge about Arcelik-AI tool before you start using it and try to get 6 points out of 8.",
    },
    {
      title: "Create Your App",
      icon: <IoIosPaperPlane className="icon" size={30}/>,
      condition: false,
      description:
        "Edit content in a comfortable manner. It’s as simple as copy and paste. Add your own knowledge base if necessary and start creating personalized apps.",
    },
  ];

  return (
    <div className="bottom-content">
      {bottomContentData.map((item, index) => (
        <div key={index} className={`container container-${index + 1}`}>
          <div className="text-title">
            { item.icon }
            <div className="headline">
              <h4>{item.title}</h4>
              {item.condition && <FaCheckCircle size={15} color="green"/>}
            </div>
          </div>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomContent;
