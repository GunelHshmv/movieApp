import React from "react";
import fb from '../../assets/icons/fb.png'
import tw from '../../assets/icons/tw.png'
import inl from '../../assets/icons/in.png'
import './Footer.scss'
const Footer:React.FC = () => {
    return (
        <div className="foot">
        <div className="footer">
            <div className="footer-inner">
                <div className="footer-list">
                  <p>Home</p>
                 <ul>
                    <li>Categories</li>
                    <li>Devices</li>
                    <li>Pricing</li>
                    <li>FAQ</li>
                 </ul>
                </div>
                <div className="footer-list" >
                <p>Movies</p>
                 <ul>
                    <li>Gernes</li>
                    <li>Trending</li>
                    <li>New Release</li>
                    <li>Popular</li>
                </ul>
                </div>
            </div>
            <div className="footer-inner">
                <div className="footer-list">
                  <p>Shows</p>
                 <ul>
                    <li>Gernes</li>
                    <li>Trending</li>
                    <li>New Release</li>
                    <li>Popular</li>
                 </ul>
                </div>
                <div className="footer-list">
                <p>Support</p>
                 <ul>
                    <li>Contact Us</li>
                </ul>
                </div>
            </div>
            <div className="footer-inner">
                <div className="footer-list">
                  <p>Subscription</p>
                 <ul>
                    <li>Plans</li>
                    <li>Features</li>
                 </ul>
                </div>
                <div className="footer-list">
                <p>Connect With Us</p>
                 <div className="btn-group">
                    <button>
                        <img src={fb} alt="fb" />
                    </button>
                    <button>
                        <img src={tw} alt="tw" />
                    </button>
                    <button>
                        <img src={inl} alt="in" />
                    </button>
                 </div>
                </div>
            </div>
            
        </div>
        <hr className="hr"/>
            <div className="footer-bottom">
                <p>@2024 streamvib, All Rights Reserved</p>
                <ul>
                    <li>Terms of Use</li> |
                    <li>Privacy Policy</li> |
                    <li>Cookie Policy</li> 
                </ul>
            </div>
    </div>
    
    );
}
export default Footer;