import "./SpinningIcon.css";
import FlowerIcon from "../../../assets/FlowerIcon1.png";

const SpinningIcon = () => {
  return (
    <div className="spin-container">
      <img
        src={FlowerIcon}
        alt="Spinning flower"
        className="spinning-image"
      />
    </div>
  );
};

export default SpinningIcon;
