import './AiButtons.css';

function AiButton({ aiModals }) {
  return (
    <div className="ai-button-container">
      {aiModals.map((modal) => (
        <div className="ai-button" key={modal.id}>
          <h4>{modal.name}</h4>
          <p>{modal.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AiButton;
