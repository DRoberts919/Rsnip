import BgHeader from "../../assets/images/header-bg.svg";
import HeaderImg from "../../assets/images/header-img.svg";
import "./headerStyles.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgHeader})` }}
      className="home-header"
    >
      <div className="content row-center p-t-8 p-b-12 white-txt">
        <div className="p-lr-2 header-txt">
          <h2 className="m-b-1">Welcome To RSnip</h2>
          <h5
            className="m-b-1 green-txt"
            style={{ textTransform: "uppercase" }}
          >
            An online React snippet library
          </h5>
          <div className="white-txt-secondary">
            RSnip is a tool that allows users to create and store their React
            code solutions as snippets that run on the browser.
          </div>
          <Link
            id="signup"
            className="m-t-1 btn green-btn light-shadow"
            to="/register"
          >
            Get Started
          </Link>
        </div>
        <img
          className="header-img"
          src={HeaderImg}
          alt="Person Holding Phone"
        />
      </div>
    </div>
  );
};

export default Header;
