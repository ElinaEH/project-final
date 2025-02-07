import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import ExercisePage from "./components/pages/ExercisePage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import Signin from "./components/pages/Signin.jsx";
import Signup from "./components/pages/Signup.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/signin" element={<Signin />} /> {/* Sign In */}
          <Route path="/auth/signup" element={<Signup />} /> {/* Sign Up */}
          <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
          <Route path="/exercises" element={<ExercisePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
