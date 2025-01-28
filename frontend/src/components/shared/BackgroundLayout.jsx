import heroImage from "../../assets/images/PaintBlackHeroImg.jpg";
import "./BackgroundLayout.css";

const BackgroundLayout = ({ children }) => {
  return (
    <div className="background-wrapper">
      <div className="background-image">
        <img src={heroImage} alt="Background" />
      </div>
      {children}
    </div>
  );
};

export default BackgroundLayout;
