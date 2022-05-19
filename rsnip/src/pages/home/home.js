import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

import "./homeStyles.css";
import Card from "../../components/card/card";
import CardImgOne from "../../assets/images/card-img-1.png";
import CardImgTwo from "../../assets/images/card-img-2.png";
import CardImgThree from "../../assets/images/card-img-3.png";
import Header from "../../components/header/header";
import CallToAction from "../../components/cta/cta";
import Fast from "../../assets/images/fast.png";
import Easy from "../../assets/images/easy.png";
import Secure from "../../assets/images/secure.png";
import Shareable from "../../assets/images/shareable.png";
import Testimonial from "../../components/testimonial/testimonial";
import Footer from "../../components/footer/footer";

const Home = () => {
  const [isAuthenticated, setLoggedIn] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        console.log(user);

        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
      }
    };

    authUser();
  }, []);

  return (
    <>
      <Header />
      <div className='content black-txt'>
        <div style={{ marginTop: "-6rem" }} className='row-space-around'>
          <Card txt={"Sign up for free"} img={CardImgOne} />
          <Card txt={"Create your first snippet"} img={CardImgTwo} />
          <Card txt={"Share it with the world"} img={CardImgThree} />
        </div>
        <div className='mw-900'>
          <div
            style={{ marginBottom: 6 }}
            className='p-t-8 green-txt semi-bold'>
            WHAT WE DO
          </div>
          <h3 className='m-b-1'>What is RSnip?</h3>
          <div className="dark-secondary-text">
            RSnip is an online tool that allows users to create and share small snippets of code
            built in React. Common web solutions shouldn't be hard to code. You've already done it once,
            why do it again? With RSnip, you can save your React code as a snippet to view and use later.
            
          </div>
          <div className='row-center'>
            <HomeBoxes
              title='Fast'
              img={Fast}
              content='Create an account and post a snippet within minutes! RSnip keeps things
                    simple, so you can do what you need to with minimal effort.'
            />
            <HomeBoxes
              title='Easy'
              img={Easy}
              content='Sharing runnable snippets has never been easier. RSnip allows you to create
                    your own snippets and view others snippets with just a few clicks.'
            />
            <HomeBoxes
              title='Secure'
              img={Secure}
              content="RSnip uses a secure backend and database to make sure all of
                    your secrets are safe. You'll be the only one able to see your private snippets."
            />
            <HomeBoxes
              title='Shareable'
              img={Shareable}
              content='Have a unique solution to a problem? RSnip allows you to 
                    share your snippets online for others to see and use.'
            />
          </div>
        </div>
      </div>
      <div className='m-t-5'>
        <CallToAction />
      </div>
      <Testimonial />
      <Footer />
    </>
  );
};

const HomeBoxes = ({ title, img, content }) => {
  return (
    <div className='box-425'>
      <div className='row'>
        <div className='icon light-shadow'>
          <img className='icon-img' src={img} alt='Fast Icon' />
        </div>
        <div className='box-text'>
          <h4 className='box-title'>{title}</h4>
          <div className="dark-secondary-text">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
