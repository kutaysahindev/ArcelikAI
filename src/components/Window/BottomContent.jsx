import React from "react";

const BottomContent = () => {
  const bottomContentData = [
    {
      title: "Video Course",
      description:
        "Easily adapt to the latest changes of AI World and learn to use Arcelik’s one of the best AI tools to create your own AI Companion.",
    },
    {
      title: "Quiz",
      description:
        "Test your knowledge about Arcelik-AI tool before you start using it and try to get 6 points out of 8.",
    },
    {
      title: "Create Your App",
      description:
        "Edit content in a comfortable manner. It’s as simple as copy and paste. Add your own knowledge base if necessary and start creating personalized apps.",
    },
  ];

  return (
    <div className="bottom-content">
      {bottomContentData.map((item, index) => (
        <div key={index} className={`container container-${index + 1}`}>
          <h4 className="text-title">{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomContent;
