import { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import "./Profile.css";
import Navbar from "./Navbar.jsx";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token being used:", token);
  
        const storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("User from localStorage:", storedUser);
  
        // Set profile from stored user data
        if (storedUser) {
          setProfile({
            username: storedUser.username,
            email: storedUser.email,
            profileImage: storedUser.profileImage || ""
          });
        }
  
        // Only try to fetch from server if we have a token
        if (token) {
          const response = await fetch(`http://localhost:5000/profile`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
  
          const data = await response.json();
          console.log("Server profile data:", data);
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/profile`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
      <Navbar /> 
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-image-container">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  {profile.username?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>
                Username:
                <input
                  id="username-input"
                  type="text"
                  name="username"
                  value={profile.username || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email:
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>
            <button type="submit" className="save-button">Save</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="cancel-button"
            >
              Go back
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-image-container">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  {profile.username?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="profile-info">
              <p><strong>Username:</strong> {profile.username || 'Not set'}</p>
              <p><strong>Email:</strong> {profile.email || 'Not set'}</p>
            </div>
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
   );
};

export default Profile;
