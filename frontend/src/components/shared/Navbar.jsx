import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
// import SpinningIcon from "./SpinningIcon.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar-wrapper">
      <Link to="/" className="navbar-title">
        SOUNDSEED
      </Link>
      {/* <SpinningIcon /> */}
      {user ? (
        <div className="user-menu">
          <span className="username" onClick={toggleDropdown}>
            {user.username}
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/exercises"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Exercises
              </Link>
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <div className="dropdown-item" onClick={handleLogout}>
                Sign out
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/auth/signin">
          <span className="auth-text">SIGN IN / SIGN UP</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
