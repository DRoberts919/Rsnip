import "./homeStyles.css";
import Card from "../../components/card/card";
import CardImgOne from "../../assets/images/card-img-1.png";
import CardImgTwo from "../../assets/images/card-img-2.png";
import CardImgThree from "../../assets/images/card-img-3.png";
import Header from "../../components/header/header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="content">
        <div style={{ marginTop: "-6rem" }} className="row-space-around">
          <Card txt={"Sign up for free"} img={CardImgOne} />
          <Card txt={"Create your first snippet"} img={CardImgTwo} />
          <Card txt={"Share it with the world"} img={CardImgThree} />
        </div>
        <div>Welcome To The Home Page</div>
        <div className="btn green-btn">TEST BTN</div>
      </div>
    </>
  );
};

export default Home;
