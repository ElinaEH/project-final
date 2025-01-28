import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
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
        CREATIVITY BOOSTER
      </Link>
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
                HOME
              </Link>
              <Link
                to="/exercises"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                EXERCISES
              </Link>
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                PROFILE
              </Link>
              <div className="dropdown-item" onClick={handleLogout}>
                LOG OUT
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
