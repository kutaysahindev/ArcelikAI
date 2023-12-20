import ArcelikLoading from './ArcelikLoading'
import './LoadingLayer.css'

const LoadingLayer = () => {
  return (
    <div className="loading-container">
      <div className="loading-frame">
        <ArcelikLoading />
      </div>
    </div>
  );
};
export default LoadingLayer;
