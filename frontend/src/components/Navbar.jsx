import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <Link to="/auth/signin">
        <span className="auth-text">Sign In / Sign Up</span>
      </Link>
    </div>
  );
};

export default Navbar;
