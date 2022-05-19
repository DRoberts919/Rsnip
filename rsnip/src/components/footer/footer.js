import "./footerStyles.css";
import { Link } from "react-router-dom";
import BgHeader from "../../assets/images/header-bg.svg";

const Footer = () => {
  return (
    <div style={{ backgroundImage: `url(${BgHeader})` }} className="footer-bg">
      <div className="content row-center stretch white-txt txt-center p-tb-3">
        <div className="footer-block white-txt-secondary" >
          <div className="footer-title m-b-1">ABOUT US</div>
          <div>
            RSnip was created by <a href="https://ryanunroe.com" target="_blank">Ryan Unroe</a>,
            Cody Ashby, Phillip Duarte, and Dylan Roberts.
          </div>
        </div>
        <div className="footer-block white-txt-secondary">
          <div className="footer-title m-b-1">USEFUL LINKS</div>
          <Link to="/register">Sign Up</Link>
          <br />
          <Link to="/login">Login</Link>
        </div>
        <div className="footer-block white-txt-secondary">
          <div className="footer-title m-b-1">CONTACT US</div>
          <div>801.800.8000</div>
          <div>info@rsnip.com</div>
          <div>SLC, UT 84100, US</div>
        </div>
        {/* <div className="footer-block">
          <div className="footer-title m-b-1">SEARCH SNIPPET</div>
          <input type="text"></input>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
