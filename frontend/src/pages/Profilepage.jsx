import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tickets from "./Tickets";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    photo: null,
  });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5555/profile/${username}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("User not found");
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setUpdatedUser({
          username: data.username,
          email: data.email,
          photo: null,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserData();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", updatedUser.username);
    formData.append("email", updatedUser.email);
    if (updatedUser.photo) {
      formData.append("photo", updatedUser.photo);
    }

    try {
      const response = await fetch(`http://localhost:5555/profile/${username}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const data = await response.json();
      setUser(data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  if (error) return <div className="text-center p-6">{error}</div>;
  if (!user) return null; 
  return (
    <div className="bg-gray-200 p-6 pt-[11vmin]">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 border-b pb-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              loading="lazy"
              src={
                updatedUser.photo
                  ? URL.createObjectURL(updatedUser.photo)
                  : user.photo || "https://via.placeholder.com/150"
              }
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
              </>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Profile Picture</label>
            <input type="file" onChange={handleFileChange} className="w-full" />
          </div>
        )}

        <div className="mt-6 text-right">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <Tickets username={username}/>
    </div>
  );
};

export default ProfilePage;
