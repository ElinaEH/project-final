import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Navbar from "./Navbar.jsx";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    console.log("Sign In submitted:", { username });
  
    fetch("http://localhost:5000/auth/signin", {
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
          // Make sure we're storing the token with the exact same key consistently
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            console.log("Stored token in localStorage:", data.accessToken);
          }
      
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Stored user in localStorage:", data.user);
      
            // Pass the token correctly to login function
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
            <h2 className="signin-title">Sign In</h2>
            <form onSubmit={handleSignin} className="signin-form">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Username" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" required />
              </div>  
              <button type="submit" className="signin-button">Sign In</button>
            </form>
            <p className="create-account">
              New user? <Link to="/auth/signup">Sign up here</Link>
            </p>
          </div>
        </div>
    </>
  );
};

export default Signin;
