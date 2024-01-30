const WindowTabs = ({
  tabs,
  selectedContent,
  lastCompleted,
  onSelect,
  content,
}) => {
  const tabName = content === "quiz" ? "Question" : "Video";
  const isDisabled = (id) => {
    return content === "quiz" ? false : id > lastCompleted + 1;
  };
  return (
    <div className="window-tabs">
      {tabs.map((t) => (
        <button
          key={t.Id}
          className={`v-btn ${
            selectedContent === t.Id ? "selected-content" : ""
          }`}
          onClick={() => onSelect(t.Id)}
          disabled={isDisabled(t.Id)}
        >
          {tabName} {t.Id}
        </button>
      ))}
    </div>
  );
};

export default WindowTabs;
