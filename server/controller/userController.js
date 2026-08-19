import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import twilio from "twilio";


const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


dotenv.config();


console.log("🔥 AUTH CONTROLLER LOADED");
console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP HOST:", process.env.SMTP_HOST);
console.log("SMTP PORT:", process.env.SMTP_PORT);
console.log("SMTP PASS EXISTS:", !!process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP SERVER IS READY");
  }
});




export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

  
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
  console.log(user)
  
  const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      message: "User registered successfully",
    });

  } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid email" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);



res.json({
  success: true,
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },

});

  


  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const deleteUser= async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


export const googleAuth= async (req, res) => {
  try {
    const { accessToken, role = "student" } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        message: "Google access token is required",
      });
    }

    // Get Google user information
    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!googleResponse.ok) {
      return res.status(401).json({
        message: "Invalid Google token",
      });
    }

    const googleUser = await googleResponse.json();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = googleUser;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not available",
      });
    }

    // Find existing user
    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Create new user
    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        googleId,
        profilePicture: picture || "",
        role: "student",
      });
    }

    // Generate your normal JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Google authentication successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });

  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(500).json({
      message: "Google authentication failed",
    });
  }
};


export const capachaAuth=async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      captchaToken,
    } = req.body;

    if (!captchaToken) {
      return res.status(400).json({
        message: "Please complete the CAPTCHA",
      });
    }

    // Verify CAPTCHA
    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({
        message: "CAPTCHA verification failed",
      });
    }

  }catch (error) {
    console.error("capacha authentication error:", error)
  }

}




export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
  console.log("🔥 FORGOT PASSWORD CALLED");
       console.log("📧 Email:", email);

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    console.log("👤 User found:", !!user);
    // Don't reveal whether an email exists
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Google-only account
    if (user.googleId && !user.password) {
      return res.status(400).json({
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store HASHED token in database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token expires in 15 minutes
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Reset link sent to user's email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
console.log("📨 ABOUT TO SEND EMAIL");
console.log("📤 Sending to:", user.email);
    await transporter.sendMail({
      from: `"Your Website" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
        ">

          <h2 style="color: #222;">
            Reset Your Password
          </h2>

          <p>
            Hello ${user.name},
          </p>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 15px 0;
            "
          >
            Reset Password
          </a>

          <p>
            This link will expire in <strong>15 minutes</strong>.
          </p>

          <p>
            If you didn't request a password reset, you can safely ignore
            this email.
          </p>

          <hr />

          <p style="color: #777; font-size: 12px;">
            This is an automated email. Please don't reply.
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};




export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Reset link is invalid or has expired",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Invalidate token after successful reset
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. You can now login.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};



export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      status: verification.status,
    });
  } catch (error) {
    console.error("Send OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required",
      });
    }

    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: otp,
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // OTP is correct
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role: "student",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Phone verified successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};