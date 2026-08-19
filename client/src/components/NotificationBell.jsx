import React, { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";

const NotificationBell = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Temporary notifications
  // Later these will come from your backend API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to SkillArena!",
      message: "Your account has been created successfully.",
      isRead: false,
    },
    {
      id: 2,
      title: "Complete your profile",
      message: "Add a profile picture to your account.",
      isRead: false,
    },
    {
      id: 3,
      title: "Complete your profile",
      message: "Add a profile picture to your account.",
      isRead: false,
    },
    {
      id: 4,
      title: "Complete your profile",
      message: "Add a profile picture to your account.",
      isRead: false,
    },
    {
      id: 5,
      title: "Complete your profile",
      message: "Add a profile picture to your account.",
      isRead: false,
    },
  ]);

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

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <div className="notification-container" ref={menuRef}>
      {/* Bell */}
      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
      >
        <Bell size={23} />

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>

            {unreadCount > 0 && (
              <button onClick={markAllAsRead}>
                <CheckCheck size={16} />
                Mark all
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <Bell size={30} />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.isRead ? "unread" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-dot"></div>

                  <div>
                    <strong>{notification.title}</strong>
                    <p>{notification.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <button>View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;