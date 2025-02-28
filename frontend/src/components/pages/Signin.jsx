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
	const handleSignin = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;

		try {
			const response = await fetch(`${API_URL}/auth/signin`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				alert("Signin failed: " + (data.message || "Invalid credentials"));
				return;
			}

			if (data && data.message === "Login successful") {
				// Store authentication data and redirect to home
				if (data.accessToken) {
					localStorage.setItem("accessToken", data.accessToken);
				}

				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					login(data.user.username, data.accessToken);
				}

				navigate("/");
			}
		} catch (error) {
			//Handles unexpected errors
			alert("An error occurred while signing in. Please try again");
		}
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
							<input type="text" id="username" name="username" autoComplete="username" placeholder="Username" required />
						</div>
						<div className="input-group">
							<label htmlFor="password">PASSWORD</label>
							<input type="password" id="password" name="password" autoComplete="current-password" placeholder="Password" required />
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
