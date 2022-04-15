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
          <h1>Welcome To RSnip</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.. </h3>
          <div>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip. Ut enim ad minim veniam, quis nostrud exercitation
          </div>
          <Link className="m-t-1 btn green-btn" to="/register">
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
