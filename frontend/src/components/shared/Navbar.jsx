import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { Menu } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownPosition = useCallback(() => {
    const dropdown = document.querySelector('.dropdown-menu');
    if (!dropdown) return;
    
    const rect = dropdown.getBoundingClientRect();
    dropdown.classList.remove('left-overflow', 'right-overflow');
    
    if (rect.right > window.innerWidth) {
      dropdown.classList.add('right-overflow');
    } else if (rect.left < 0) {
      dropdown.classList.add('left-overflow');
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      handleDropdownPosition();
      window.addEventListener('resize', handleDropdownPosition);
    }

    return () => {
      window.removeEventListener('resize', handleDropdownPosition);
    };
  }, [isDropdownOpen, handleDropdownPosition]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navControls = document.querySelector('.nav-controls');
      if (isDropdownOpen && navControls && !navControls.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="navbar-wrapper">
      <Link to="/" className="navbar-title">
        SOUNDSEED
      </Link>
      <div className="nav-controls">
        {user ? (
          <Link to="/profile" className="username-link">
            <span className="username">{user.username}</span>
          </Link>
        ) : (
          <Link to="/auth/signin">
            <span className="auth-text">SIGN IN / SIGN UP</span>
          </Link>
        )}
        <button className="menu-button" onClick={toggleDropdown}>
          <Menu size={24} color="#feb7e8" />
        </button>
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
            {user && (
              <>
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  PROFILE
                </Link>
                <div className="dropdown-item" onClick={handleLogout}>
                  SIGN OUT
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
