import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createUserModel from "../models/userSchema.js";
import { sequelize } from "../postgres/postereg.js";
import nodemailer from "nodemailer";

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "2001Mahesh",
    {
      expiresIn: "1h",
    },
  );
};

const User = createUserModel(sequelize);
const register = async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password, role } = req.body;
  const isEmailExist = await User.findOne({ where: { email } });
  if (isEmailExist) {
    return res.status(409).json({ message: "Email already existsss" });
  }
  const VALID_ROLES = ["admin", "user"];
  // Validate the role
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      mobileNumber,
    });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // const token= createToken(user);

  res.json({ message: "Login successful. OTP sent n email" });
};

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "maheshtidgam1234@gmail.com",
    pass: process.env.EMAIL_PASS || "maheshtidgam@1234",
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "maheshtidgam1234@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const authService = {
  register,
  login,
  sendOTP,
};
