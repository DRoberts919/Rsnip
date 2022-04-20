import "./testimonialStyles.css";
import StarRatings from "react-star-ratings";

const Testimonial = () => {
  return (
    <div className="black-txt m-tb-5 txt-center">
      <div style={{ marginBottom: 8 }} className="green-txt semi-bold">
        WHAT WE DO
      </div>
      <h3 className="m-b-2">RSnip Reviews</h3>
      <div className="testimonial-msg light-shadow extra-white-bg txt-left">
        <div className="m-b-1">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip. Ut enim ad minim veniam, quis nostrud exercitation Ut
          enim ad minim veniam, quis nostrud exercitation.
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
      </div>
    </div>
  );
};

export default Testimonial;
