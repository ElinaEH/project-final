import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import ProfileEdit from "../profile/ProfileEdit.jsx";
import SavedExercises from "../profile/SavedExercises.jsx";
import AudioFiles from "../profile/audio/AudioFiles.jsx";
import Navbar from "../shared/Navbar.jsx";
import LightBulbIcon from "../../assets/light-bulb.png";
import Footer from "../shared/Footer.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    savedExercises: [],
    audioFiles: []
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      console.log("Server profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="lightbulb-image-container">
            <img
            src={LightBulbIcon}
            alt="yellow-lightbulb"
            className="lightbulb-icon"
            />
        </div>
        <div className="profile-container">
          <h1 className="profile-title">User Profile</h1>
          {isEditing ? (
            <ProfileEdit 
              profile={profile}
              setProfile={setProfile}
              setIsEditing={setIsEditing}
              onProfileUpdate={fetchProfile}
            />
          ) : (
            <div className="profile-details">
              <div className="section-container">
                <div className="profile-wrapper">
                  <div className="profile-info">
                    <div className="profile-field">
                      <span className="profile-label">Username:</span>
                      <span className="profile-value">{profile.username || "Not set"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="profile-label">Email:</span>
                      <span className="profile-value">{profile.email || "Not set"}</span>
                    </div>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="edit-button">
                    EDIT PROFILE
                  </button>
                </div>
              </div>
  
              <div className="section-container">
                <SavedExercises 
                  exercises={profile.savedExercises}
                  onDelete={fetchProfile}
                />
              </div>
  
              <div className="section-container">
                <AudioFiles />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
