import ArcelikLoading from './ArcelikLoading'
import './LoadingLayer.css'

const LoadingLayer = ({ isApproved }) => {
  return (
    <div className="loading-container">
      <div className="loading-frame">
        <ArcelikLoading />
      </div>
      {isApproved === null ? (
        <p className='message'>Checking</p>
      ) : isApproved === true ? (
        <p className='message'>Signed in <span className='true'>seccessfully</span></p>
      ) : (
        <p className='message'>Sign-in <span className='false'>failed</span></p>
      )}
    </div>
  );
};
export default LoadingLayer;
