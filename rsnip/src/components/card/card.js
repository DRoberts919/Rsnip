import "./cardStyles.css";

const Card = ({ img, txt }) => {
  return (
    <div className="card light-shadow m-1">
      <img src={img} alt="Card Img" />
      <div className="txt-center">{txt}</div>
    </div>
  );
};

export default Card;
