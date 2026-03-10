import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  
} from "recharts";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeInstructors: 0,
    totalCourses: 0,
    totalEarnings: 0,
  });

  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/dashboard/admin/stats");
        const data = await res.json();
        setStats(data);

        setRevenueData([
          { month: "Jan", revenue: 4000 },
          { month: "Feb", revenue: 6500 },
          { month: "Mar", revenue: 8000 },
          { month: "Apr", revenue: 7200 },
          { month: "May", revenue: 9500 },
          { month: "Jun", revenue: 12000 },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-home">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>System overview, performance stats, and recent activity.</p>
      </div>

      <div className="admin-kpis">
        <div className="admin-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="admin-card">
          <h3>{stats.activeInstructors}</h3>
          <p>Active Instructors</p>
        </div>

        <div className="admin-card">
          <h3>{stats.totalCourses}</h3>
          <p>Total Courses</p>
        </div>

        <div className="admin-card">
          <h3>$100{stats.totalEarnings}</h3>
          <p>Total Earnings</p>
        </div>
      </div>

      <div className="admin-chart-section">
        <h3>Revenue Overview</h3>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AdminHome;