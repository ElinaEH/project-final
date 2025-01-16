import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Signin from "./components/Signin.jsx";  
import Signup from "./components/Signup.jsx"; 

export const App = () => {
  return (
    <>
      <h1>"LALALA" with BARBARA♪</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signin" element={<Signin />} /> {/* Sign In */}
          <Route path="/auth/signup" element={<Signup />} /> {/* Sign Up */}
        </Routes>
      </Router>
    </>
  );
};
