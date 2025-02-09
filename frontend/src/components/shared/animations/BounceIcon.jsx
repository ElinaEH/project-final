import "./BounceIcon.css";
import LightBulb from "../../../assets/light-bulb.png";

const BounceIcon = () => {
  return (
    <div className="bounce-container">
      <img
        src={LightBulb}
        alt="Bouncing lightbulb"
        className="bouncing-lightbulb-image"
      />
    </div>
  );
};

export default BounceIcon;
