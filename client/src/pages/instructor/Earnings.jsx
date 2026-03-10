import React, { useEffect, useState } from "react";
import "./EarningsPage.css";
import { DollarSign, TrendingUp, Wallet, ArrowDownCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const payoutHistory = [
  { id: 1, amount: "$420", date: "Jan 05, 2026", status: "Paid" },
  { id: 2, amount: "$380", date: "Dec 28, 2025", status: "Paid" },
  { id: 3, amount: "$510", date: "Dec 15, 2025", status: "Pending" },
];

const EarningsPage = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    setRevenueData([
      { month: "Jan", revenue: 1200 },
      { month: "Feb", revenue: 1500 },
      { month: "Mar", revenue: 1800 },
      { month: "Apr", revenue: 1400 },
      { month: "May", revenue: 2000 },
      { month: "Jun", revenue: 2200 },
    ]);
  }, []);

  return (
    <div className="earnings-container">

      <h1 className="earnings-title">Earnings Overview</h1>
      <p className="earnings-subtitle">
        Track your revenue, payouts, and earning performance.
      </p>

      <div className="earnings-stats-grid">
        <div className="earn-card">
          <div className="earn-icon icon-blue">
            <DollarSign size={28} />
          </div>
          <div>
            <h3>$1,540</h3>
            <p>Total Earnings</p>
          </div>
        </div>

        <div className="earn-card">
          <div className="earn-icon icon-green">
            <TrendingUp size={28} />
          </div>
          <div>
            <h3>$1,320</h3>
            <p>This Month</p>
          </div>
        </div>

        <div className="earn-card">
          <div className="earn-icon icon-purple">
            <Wallet size={28} />
          </div>
          <div>
            <h3>$740</h3>
            <p>Available Balance</p>
          </div>
        </div>
      </div>

      <button className="withdraw-btn">
        <ArrowDownCircle size={20} /> Withdraw Funds
      </button>

      <div className="earnings-main-grid">
        <div className="earn-chart-box">
          <h2>Monthly Revenue</h2>
          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
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
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="payout-history-box">
          <h2>Payout History</h2>
          <table className="payout-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((payout) => (
                <tr key={payout.id}>
                  <td>{payout.amount}</td>
                  <td>{payout.date}</td>
                  <td>
                    <span className={`payout-badge ${payout.status.toLowerCase()}`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default EarningsPage;