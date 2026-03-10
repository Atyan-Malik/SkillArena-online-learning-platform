import React, { useEffect, useState } from "react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("http://localhost:15000/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:15000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    alert("Settings Updated Successfully!");
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>

      {/* General */}
      <div className="settings-card">
        <h3>General Settings</h3>
        <input
          type="text"
          name="platformName"
          value={settings.platformName}
          onChange={handleChange}
          placeholder="Platform Name"
        />
        <input
          type="email"
          name="supportEmail"
          value={settings.supportEmail}
          onChange={handleChange}
          placeholder="Support Email"
        />
        <input
          type="text"
          name="timezone"
          value={settings.timezone}
          onChange={handleChange}
          placeholder="Timezone"
        />
        <input
          type="text"
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          placeholder="Currency"
        />
        <label>
          Maintenance Mode
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* User */}
      <div className="settings-card">
        <h3>User Settings</h3>
        <label>
          Allow Registration
          <input
            type="checkbox"
            name="allowRegistration"
            checked={settings.allowRegistration}
            onChange={handleChange}
          />
        </label>

        <label>
          Require Email Verification
          <input
            type="checkbox"
            name="requireEmailVerification"
            checked={settings.requireEmailVerification}
            onChange={handleChange}
          />
        </label>

        <label>
          Instructor Approval
          <input
            type="checkbox"
            name="instructorApproval"
            checked={settings.instructorApproval}
            onChange={handleChange}
          />
        </label>

        <input
          type="number"
          name="minPasswordLength"
          value={settings.minPasswordLength}
          onChange={handleChange}
          placeholder="Min Password Length"
        />
      </div>

      {/* Course */}
      <div className="settings-card">
        <h3>Course Settings</h3>

        <label>
          Course Approval Required
          <input
            type="checkbox"
            name="courseApprovalRequired"
            checked={settings.courseApprovalRequired}
            onChange={handleChange}
          />
        </label>

        <label>
          Enable Reviews
          <input
            type="checkbox"
            name="enableReviews"
            checked={settings.enableReviews}
            onChange={handleChange}
          />
        </label>

        <label>
          Auto Certificate
          <input
            type="checkbox"
            name="autoCertificate"
            checked={settings.autoCertificate}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Payment */}
      <div className="settings-card">
        <h3>Payment Settings</h3>

        <input
          type="number"
          name="platformCommission"
          value={settings.platformCommission}
          onChange={handleChange}
          placeholder="Platform Commission %"
        />

        <label>
          Enable Payments
          <input
            type="checkbox"
            name="paymentsEnabled"
            checked={settings.paymentsEnabled}
            onChange={handleChange}
          />
        </label>

        <select
          name="paymentGateway"
          value={settings.paymentGateway}
          onChange={handleChange}
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        Save All Settings
      </button>
    </div>
  );
};

export default AdminSettings;
