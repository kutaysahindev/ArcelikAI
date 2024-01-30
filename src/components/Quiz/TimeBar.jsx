import { useEffect, useState } from "react";
import './TimeBar.css'

const TimeBar = ({ duration }) => {
  const [time, setTime] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    const flow = setInterval(() => {
      // console.log("first")
      setTime((prev) => (prev > 0 ? prev - 1 : prev));
      // setTime(prev => prev>0 ? prev-1 : prev);
      // if (time > 0) console.log('time: ', time)
    }, 1000);
    return () => clearInterval(flow);
  }, []);

  const timeFormatter = (time) => {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div
      className={`time-bar ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="time"
        style={{ width: (time / duration) * 100 + "%", transition: "300ms" }}
      >
      </div>
      <p className="text">{ timeFormatter(hours) } : { timeFormatter(minutes) } : { timeFormatter(seconds) }</p>
    </div>
  );
};
export default TimeBar;
