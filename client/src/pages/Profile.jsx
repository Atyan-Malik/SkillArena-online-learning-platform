import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Mail,
  User,
  GraduationCap,
  LogOut,
  Edit3,
} from "lucide-react";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [profilePicture, setProfilePicture] = useState(
    storedUser?.profilePicture || null
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  // Generate initials when there is no profile picture
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  // Open file picker
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Change profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Optional size restriction
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfilePicture(imageUrl);

    // Save locally
    const updatedUser = {
      ...user,
      profilePicture: imageUrl,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* Header */}
        <div className="profile-page-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        {/* Main Card */}
        <div className="profile-card">

          {/* Profile Top */}
          <div className="profile-top">

            <div className="profile-picture-wrapper">

              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={user.name}
                  className="profile-picture"
                />
              ) : (
                <div className="profile-picture profile-initials">
                  {initials}
                </div>
              )}

              {/* Camera */}
              <button
                className="camera-button"
                onClick={handleCameraClick}
                title="Change profile picture"
              >
                <Camera size={18} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicture}
                hidden
              />
            </div>

            <div className="profile-main-info">
              <h2>{user.name}</h2>

              <span className="profile-role">
                {user.role || "Student"}
              </span>

              <p>{user.email}</p>
            </div>

          </div>

          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Details */}
          <div className="profile-details">

            <h3>Personal Information</h3>

            <div className="profile-info-grid">

              {/* Name */}
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <User size={20} />
                </div>

                <div>
                  <span>Full Name</span>
                  <strong>{user.name}</strong>
                </div>
              </div>

              {/* Email */}
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <Mail size={20} />
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>{user.email}</strong>
                </div>
              </div>

              {/* Role */}
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <span>Account Type</span>
                  <strong>
                    {user.role
                      ? user.role.charAt(0).toUpperCase() +
                        user.role.slice(1)
                      : "Student"}
                  </strong>
                </div>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="profile-actions">

            <button
              className="edit-profile-button"
              onClick={() => alert("Edit profile coming soon")}
            >
              <Edit3 size={18} />
              Edit Profile
            </button>

            <button
              className="logout-profile-button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;