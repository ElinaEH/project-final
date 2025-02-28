import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer.jsx";
import "./Signup.css";

// Component for user registration handling
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
	const navigate = useNavigate();

	// Handle form submission and user creation
	const handleSignup = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const response = await fetch(`${API_URL}/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const data = await response.json();

			if (response.ok && data.message === "User created successfully") {
				alert("User created successfully! Please sign in.");
				navigate("/auth/signin");
			} else {
				// Single error alert with more specific message if available
				const errorMessage = data.error || "Error occurred while signing up. Please try again.";
				alert(errorMessage);
			}
		} catch (error) {
			// Only catches network errors or JSON parsing errors
			alert("Network error occurred. Please check your network connection and try again.");
		}
	};

	return (
		<>
			<Navbar />
			<div className="signup-container">
				<div className="signup-box">
					<h2 className="signup-title">Sign Up</h2>
					<form onSubmit={handleSignup} className="signup-form">
						<div className="input-group">
							<label htmlFor="username">USERNAME</label>
							<input type="text" id="username" name="username" autoComplete="username" placeholder="Username" required />
						</div>
						<div className="input-group">
							<label htmlFor="email">EMAIL</label>
							<input type="text" id="email" name="email" autoComplete="email" placeholder="Email" required />
						</div>
						<div className="input-group">
							<label htmlFor="password">PASSWORD</label>
							<input type="password" id="password" name="password" autoComplete="new-password" placeholder="Password" required />
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


export default Signup;
