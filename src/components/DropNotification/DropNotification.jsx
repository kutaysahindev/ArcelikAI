import './DropNotification.css'
import { useSelector } from 'react-redux';

export const DropNotification = ({ txt, type, time }) => {
  const { notificationDirection } = useSelector((slices) => slices.user);
  return (
    // <div className={`notification-container sec-${time/1000}`} >
    <div className={`notification-container ${notificationDirection}`} >
        <p className={`notification-txt ${type}`}>{ txt }</p>
    </div>
  )
}