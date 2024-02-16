import './DropNotification.css'

export const DropNotification = ({ txt, type, time }) => {
  return (
    // <div className={`field ${msg ? "fall" : ""}`}>
      <div className={`notification-container sec-${time/1000}`} >
        <p className={`notification-txt ${type}`}>{ txt }</p>
      </div>
    // </div>
  )
}