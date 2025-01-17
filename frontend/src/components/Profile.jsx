import { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Image URL:
            <input
              type="text"
              name="profileImage"
              value={profile.profileImage || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Profile Image:</strong></p> 
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "12px" }}
            />
          )}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;