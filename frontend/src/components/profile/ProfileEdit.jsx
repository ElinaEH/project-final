import "./ProfileEdit.css";

const ProfileEdit = ({ profile, setProfile, setIsEditing, onProfileUpdate }) => {
    const handleChange = (e) => {
      setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });
  
        if (!response.ok) throw new Error("Failed to update profile");
  
        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
        onProfileUpdate();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  
    return (
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
    );
  };
  
  export default ProfileEdit;