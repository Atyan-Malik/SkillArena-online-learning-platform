import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

const ProfileMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // Create initials if user doesn't have a profile picture
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpen(false);

    if (onLogout) {
      onLogout();
    }

    navigate("/login");
  };

  return (
    <div className="profile-menu-container" ref={menuRef}>
      {/* Profile Button */}
      <button
        className="profile-button"
        onClick={() => setOpen(!open)}
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar profile-initials">
            {initials}
          </div>
        )}

        <ChevronDown
          size={16}
          className={open ? "rotate-arrow" : ""}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown">
          {/* User Info */}
          <div className="profile-dropdown-header">
            <div className="profile-avatar profile-initials">
              {initials}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          {/* Profile */}
          <NavLink
            to="/profile"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

          <div className="dropdown-divider"></div>

          {/* Logout */}
          <button
            className="profile-dropdown-item logout-item"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;