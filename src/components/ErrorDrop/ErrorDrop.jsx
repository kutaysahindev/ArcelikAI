import './ErrorDrop.css'

export const ErrorDrop = ({ msg }) => {
  return (
    // <div className={`field ${msg ? "fall" : ""}`}>
      <div className={`err-container ${msg ? "fall" : ""}`} >
        <p className="err-msg">{ msg }</p>
      </div>
    // </div>
  )
}