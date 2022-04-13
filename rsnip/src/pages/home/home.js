import BgHeader from "../../assets/images/header-bg.svg";
import HeaderImg from "../../assets/images/header-img.svg";
import "./homeStyles.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* <img style={{ width: "100%" }} src={BgHeader} alt="Header Bg" /> */}
      <div
        style={{ backgroundImage: `url(${BgHeader})` }}
        className="home-header"
      >
        <div className="content row-center p-tb-10 white-txt">
          <div className="p-lr-2 header-txt">
            <h1>Welcome To RSnip</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.. </h3>
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip. Ut enim ad minim veniam, quis nostrud
              exercitation
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
      <div className="content">
        <div>Welcome To The Home Page</div>
        <div className="btn green-btn">TEST BTN</div>
      </div>
    </>
  );
};

export default Home;
