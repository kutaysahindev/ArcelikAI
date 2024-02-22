import arclk from './Assets/global.png';
import { FaRegCircleUser } from "react-icons/fa6";
import './Navbar.css';

function Navbar() {
    return(
        <>
            <div className="navbar-container">
                <div className="arclk-logo">
                    <img className="logo" src={arclk}></img>
                </div>
                
                <div className="user-section">
                    <a className="first-button">Admin Page</a>
                    <FaRegCircleUser className='user'/>
                </div>
            </div>
        </>

    );
}

export default Navbar;