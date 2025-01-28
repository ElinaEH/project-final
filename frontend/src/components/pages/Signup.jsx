import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer.jsx";
import "./Signup.css";

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Sign Up submitted:", { username });

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sign Up Response:", data);
        if (data.message === "User created successfully") {
          alert("User created successfully! Please sign in.");
          window.location.href = "/auth/signin";
        } else {
          console.error("Error signing up:", data.message || "Unknown error");
          alert("Error signing up: " + (data.message || "Unknown error"));
        }
      })
      .catch((error) => {
        console.error("Error occurred while signing up:", error);
        alert("Error occurred while signing up. Please try again later.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="input-group">
              <label>USERNAME</label>
              <input type="text" name="username" placeholder="Username" required />
            </div>
            <div className="input-group">
              <label>EMAIL</label>
              <input type="text" name="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <label>PASSWORD</label>
              <input type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <p className="create-account">
            Already have an account? <Link to="/auth/signin">Sign in here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup; // This is necessary to allow importing the Signup component
