import { Link } from "react-router-dom";

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log("Sign Up submitted:", { username });

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/auth/signin">Sign in here</Link>
      </p>
    </div>
  );
};

export default Signup; // This is necessary to allow importing the Signup component
