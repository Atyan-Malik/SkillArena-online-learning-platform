import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    platformName: { type: String, default: "Skill Arena" },
    supportEmail: { type: String, default: "" },
    timezone: { type: String, default: "Asia/Karachi" },
    currency: { type: String, default: "PKR" },
    maintenanceMode: { type: Boolean, default: false },

    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: true },
    instructorApproval: { type: Boolean, default: true },
    minPasswordLength: { type: Number, default: 8 },

    courseApprovalRequired: { type: Boolean, default: true },
    enableReviews: { type: Boolean, default: true },
    autoCertificate: { type: Boolean, default: true },

    platformCommission: { type: Number, default: 20 },
    paymentsEnabled: { type: Boolean, default: false },
    paymentGateway: { type: String, default: "stripe" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
