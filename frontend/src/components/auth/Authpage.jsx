import { useState } from "react";

// Component to handle both signup and signin forms with toggle functionality
const AuthPage = () => {
 // Track whether to show signup (true) or signin (false) form
 const [isSignup, setIsSignup] = useState(true);

 // Toggle between signup and signin forms
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
