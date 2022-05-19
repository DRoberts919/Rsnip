import "./testimonialStyles.css";
import StarRatings from "react-star-ratings";
import Cody from "../../assets/images/cody.jpg";

const Testimonial = () => {
  return (
    <div className="black-txt m-t-5 m-b-10 txt-center">
      <div style={{ marginBottom: 8 }} className="green-txt semi-bold">
        WHAT WE DO
      </div>
      <h3 className="m-b-2">RSnip Reviews</h3>
      <div className="testimonial-msg light-shadow extra-white-bg txt-left">
        <div className="m-b-1">
          RSnip has made it easy for me to keep a library of my commonly used React solutions.
          And when I need help building something new, I can find how other people have solved the problem.
        </div>
        <StarRatings
          rating={5}
          starRatedColor="orange"
          starDimension="30px"
          starSpacing="2px"
        />
      </div>
      <div className="position-triangle">
        <div className="triangle"></div>
        <div className="overlap-triangle"></div>
      </div>
      <div className="profile-bg light-shadow">
        <img
          className="profile-img"
          src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
          alt="User Profile"
        />
        <div className="bold">John Doe</div>
      </div>
    </div>
  );
};

export default Testimonial;
