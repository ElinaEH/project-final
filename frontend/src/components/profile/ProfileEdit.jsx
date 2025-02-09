// Component for editing user profile information (username and email)

import "./ProfileEdit.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProfileEdit = ({ profile, setProfile, setIsEditing, onProfileUpdate }) => {
  // Update profile state as user types in form fields
  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit updated profile data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/profile`, {
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
    <div className="profile-edit-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2 className="form-title">EDIT PROFILE</h2>
        <div className="form-group">
          <label htmlFor="username-input">USERNAME</label>
          <input
            id="username-input"
            type="text"
            name="username"
            value={profile.username || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email-input">EMAIL</label>
          <input
            id="email-input"
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="save-button-profile">SAVE</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="go-back-button"
          >
            GO BACK
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;