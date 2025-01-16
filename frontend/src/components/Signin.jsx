import { Link } from "react-router-dom";

const Signin = () => {
  const handleSignin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Handle the sign-in logic here, sending data to backend
    console.log("Sign In submitted:", { username });

    // Sending a POST request to the backend API for signin
    fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sign In Response:", data);
        if (data.accessToken) {
          // Successfully signed in, store the token (for example in localStorage or sessionStorage)
          localStorage.setItem("authToken", data.Token);
          // Redirect or take action on successful signin (e.g., go to homepage or dashboard)
        } else {
          // Handle any error responses from the backend
          console.error("Error signing in:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        New user? <Link to="/auth/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Signin;
