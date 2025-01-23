/**
* AuthContext provides centralized authentication management.
* - Maintains user auth state
* - Handles login/logout
* - Stores/retrieves auth data in localStorage
* - Makes auth functions available app-wide via useAuth hook
*/

import { AuthProvider } from "./components/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Signin from "./components/Signin.jsx";  
import Signup from "./components/Signup.jsx"; 
import Profile from "./components/Profile.jsx";
import "./App.css";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signin" element={<Signin />} /> {/* Sign In */}
          <Route path="/auth/signup" element={<Signup />} /> {/* Sign Up */}
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};
