import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import "./AdminDashboard.css";

const AdminHeader = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="admin-header">
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu />
      </button>

      <div className="header-right">
        <button className="notification-btn">
          <Bell />
        </button>
        <div className="profile">Admin</div>
      </div>
    </header>
  );
};

export default AdminHeader;
