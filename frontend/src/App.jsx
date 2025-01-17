import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Signin from "./components/Signin.jsx";  
import Signup from "./components/Signup.jsx"; 
import Profile from "./components/Profile.jsx";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signin" element={<Signin />} /> {/* Sign In */}
          <Route path="/auth/signup" element={<Signup />} /> {/* Sign Up */}
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
        </Routes>
      </Router>
    </>
  );
};
