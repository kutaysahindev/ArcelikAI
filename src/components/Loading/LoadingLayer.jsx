import ArcelikLoading from './ArcelikLoading'
import './LoadingLayer.css'

const LoadingLayer = ({ isApproved, oktaSign }) => {
  return (
    <div className="loading-container">
      <div className="loading-frame">
        <ArcelikLoading />
      </div>
      {!isApproved && !oktaSign ? (
        <p className='message'>Redirecting...</p>
      ) : !isApproved && oktaSign ? (
        <p className='message'>Checking...</p>
      ) : isApproved ? (
        <p className='message'>Signed in <span className='true'>successfully</span></p>
      ) : (
        <p className='message'>Sign-in <span className='false'>failed</span></p>
      )}
    </div>
  );
};
export default LoadingLayer;
