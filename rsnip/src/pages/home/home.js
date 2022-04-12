import BgHeader from "../../assets/images/header-bg.svg";

const Home = () => {
  return (
    <>
      <img style={{ width: "100%" }} src={BgHeader} alt="Header Bg" />
      <div class="content">
        <div style={{ height: "100vh" }}>Welcome To The Home Page</div>
        <div className="btn green-btn">TEST BTN</div>
      </div>
    </>
  );
};

export default Home;
