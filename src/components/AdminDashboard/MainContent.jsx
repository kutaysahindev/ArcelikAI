const MainContent = () => {
  const gridItems = [
    { title: "User Stats", image: "../Graph.png" },
    { title: "Customers", image: "../content1.png" },
    { title: "Featured Model", image: "../content2.png" },
    { title: "User Analytics", image: "../content3.png" },
  ];

  return (
    <div className="main-content">
      <h1 className="main-heading">Dashboard</h1>
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
    </div>
  );
};

export default MainContent;
