
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  Palette,
  Shield,
  LogOut,
  ChevronRight,
  Check,
} from "lucide-react";
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [activeSection, setActiveSection] = useState("account");

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    messages: true,
    announcements: true,
    emailNotifications: false,
  });

  const [darkMode, setDarkMode] = useState(false);

  if (!storedUser) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      id: "account",
      label: "Account",
      icon: <User size={19} />,
    },
    {
      id: "password",
      label: "Password & Security",
      icon: <Lock size={19} />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={19} />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette size={19} />,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: <Shield size={19} />,
    },
  ];

  return (
    <div className="settings-page">

      <div className="settings-container">

        {/* Page Header */}
        <div className="settings-heading">
          <h1>Settings</h1>
          <p>
            Manage your account preferences and application settings.
          </p>
        </div>

        <div className="settings-layout">

          {/* Sidebar */}
          <aside className="settings-sidebar">

            <div className="settings-user">

              <div className="settings-avatar">
                {storedUser.name
                  ? storedUser.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()
                  : "U"}
              </div>

              <div>
                <strong>{storedUser.name}</strong>
                <span>{storedUser.email}</span>
              </div>

            </div>

            <div className="settings-menu">

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`settings-menu-item ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}

                  <span>{item.label}</span>

                  <ChevronRight
                    size={16}
                    className="settings-arrow"
                  />
                </button>
              ))}

            </div>

            <div className="settings-sidebar-divider"></div>

            <button
              className="settings-logout"
              onClick={handleLogout}
            >
              <LogOut size={19} />
              Logout
            </button>

          </aside>

          {/* Content */}
          <main className="settings-content">

            {/* ACCOUNT */}
            {activeSection === "account" && (
              <section className="settings-section">

                <div className="section-heading">
                  <div className="section-icon blue">
                    <User size={20} />
                  </div>

                  <div>
                    <h2>Account</h2>
                    <p>Manage your personal account information.</p>
                  </div>
                </div>

                <div className="settings-form">

                  <div className="settings-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={storedUser.name || ""}
                      readOnly
                    />
                  </div>

                  <div className="settings-field">
                    <label>Email Address</label>

                    <input
                      type="email"
                      value={storedUser.email || ""}
                      readOnly
                    />
                  </div>

                  <div className="settings-field">
                    <label>Account Type</label>

                    <input
                      type="text"
                      value={
                        storedUser.role
                          ? storedUser.role
                              .charAt(0)
                              .toUpperCase() +
                            storedUser.role.slice(1)
                          : "Student"
                      }
                      readOnly
                    />
                  </div>

                  <div className="settings-info-box">
                    <strong>Want to change your information?</strong>

                    <p>
                      You can update your profile information from
                      your Profile page.
                    </p>

                    <button
                      onClick={() => navigate("/profile")}
                    >
                      Go to Profile
                    </button>
                  </div>

                </div>

              </section>
            )}

            {/* PASSWORD */}
            {activeSection === "password" && (
              <section className="settings-section">

                <div className="section-heading">
                  <div className="section-icon purple">
                    <Lock size={20} />
                  </div>

                  <div>
                    <h2>Password & Security</h2>
                    <p>
                      Keep your account secure by managing your
                      password.
                    </p>
                  </div>
                </div>

                <div className="settings-form">

                  <div className="settings-field">
                    <label>Current Password</label>

                    <input
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="settings-field">
                    <label>New Password</label>

                    <input
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="settings-field">
                    <label>Confirm New Password</label>

                    <input
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button className="save-button">
                    <Check size={17} />
                    Update Password
                  </button>

                </div>

              </section>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <section className="settings-section">

                <div className="section-heading">
                  <div className="section-icon orange">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h2>Notifications</h2>
                    <p>
                      Choose which notifications you want to receive.
                    </p>
                  </div>
                </div>

                <div className="settings-options">

                  <label className="setting-toggle-row">
                    <div>
                      <strong>Course Updates</strong>
                      <span>
                        Get notified when your enrolled courses are
                        updated.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.courseUpdates}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          courseUpdates: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="setting-toggle-row">
                    <div>
                      <strong>Messages</strong>
                      <span>
                        Receive notifications for new messages.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          messages: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="setting-toggle-row">
                    <div>
                      <strong>Announcements</strong>
                      <span>
                        Receive important SkillArena announcements.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.announcements}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          announcements: e.target.checked,
                        })
                      }
                    />
                  </label>

                  <label className="setting-toggle-row">
                    <div>
                      <strong>Email Notifications</strong>
                      <span>
                        Receive important notifications through email.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailNotifications: e.target.checked,
                        })
                      }
                    />
                  </label>

                </div>

              </section>
            )}

            {/* APPEARANCE */}
            {activeSection === "appearance" && (
              <section className="settings-section">

                <div className="section-heading">
                  <div className="section-icon pink">
                    <Palette size={20} />
                  </div>

                  <div>
                    <h2>Appearance</h2>
                    <p>
                      Customize how SkillArena looks for you.
                    </p>
                  </div>
                </div>

                <div className="settings-options">

                  <label className="setting-toggle-row">

                    <div>
                      <strong>Dark Mode</strong>
                      <span>
                        Switch between light and dark appearance.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) =>
                        setDarkMode(e.target.checked)
                      }
                    />

                  </label>

                </div>

              </section>
            )}

            {/* PRIVACY */}
            {activeSection === "privacy" && (
              <section className="settings-section">

                <div className="section-heading">
                  <div className="section-icon green">
                    <Shield size={20} />
                  </div>

                  <div>
                    <h2>Privacy</h2>
                    <p>
                      Manage your privacy and account visibility.
                    </p>
                  </div>
                </div>

                <div className="settings-options">

                  <label className="setting-toggle-row">

                    <div>
                      <strong>Public Profile</strong>

                      <span>
                        Allow other users to view your profile.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                    />

                  </label>

                  <label className="setting-toggle-row">

                    <div>
                      <strong>Show Email</strong>

                      <span>
                        Allow your email address to be visible on
                        your public profile.
                      </span>
                    </div>

                    <input type="checkbox" />

                  </label>

                </div>

              </section>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default Settings;