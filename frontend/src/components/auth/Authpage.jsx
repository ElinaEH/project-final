import { useState } from "react";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);

	const toggleForm = () => {
		setIsSignup(!isSignup);
	};

	return (
		<div>
			<h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
			<form>
				<input type="text" placeholder="Username" required />
				<input type="password" placeholder="Password" required />
				<button type="submit">{isSignup ? "Sign up" : "Sign In"}</button>
			</form>
			<button onClick={toggleForm}>
				Switch to {isSignup ? "Sign In" : "Sign Up"}
			</button>
		</div>
	);
};

export default AuthPage;
