import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import Footer from "../shared/Footer.jsx";
import "./Signin.css";

// Sign in component that handles user authentication
const API_URL = import.meta.env.VITE_API_URL;

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form submission and authentication
  const handleSignin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log("Sign In submitted:", { username });

    fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Sign In Response:", data);

        if (data.message === "Login successful") {
          // Store authentication data and redirect to home
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            console.log("Stored token in localStorage:", data.accessToken);
          }

          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Stored user in localStorage:", data.user);
            login(data.user.username, data.accessToken);
          }

          navigate("/");
        } else {
          console.error("Login failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Network or parsing error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-box">
          <h2 className="signin-title">SIGN IN</h2>
          <form onSubmit={handleSignin} className="signin-form">
            <div className="input-group">
              <label htmlFor="username">USERNAME</label>
              <input type="text" name="username" placeholder="Username" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">PASSWORD</label>
              <input type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="signin-button">SIGN IN</button>
          </form>
          <p className="create-account">
            New user? <Link to="/auth/signup">Sign up here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
