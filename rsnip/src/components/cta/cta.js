import "./ctaStyles.css";
import { Link } from "react-router-dom";
import BgHeader from "../../assets/images/header-bg.svg";
import CtaImgOne from "../../assets/images/cta-img-1.png";
import CtaImgTwo from "../../assets/images/cta-img-2.png";

const CallToAction = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgHeader})` }}
      className="home-header"
    >
      <div className="content row-center white-txt txt-center">
        <img src={CtaImgOne} alt="CTA Img One" />
        <div>
          <h3 className="m-b-1">Let's Get Started!</h3>
          <div>Sign Up now and share your skills to the world!</div>
          <Link className="m-t-1 btn green-btn" to="/register">
            Sign Up
          </Link>
        </div>
        <img src={CtaImgTwo} alt="CTA Img Two" />
      </div>
    </div>
  );
};

export default CallToAction;
