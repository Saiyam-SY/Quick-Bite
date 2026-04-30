import { generateToken } from "../config/token.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    // console.log("Get the functiond");
    const { fullName, email, mobile, password, role } = req.body;

    // console.log("Get the  data");

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword");

    const newUser = await User.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser._id);

    const { accessToken, refreshToken } = token;

    return res
      .cookie("refreshToken", refreshToken, {
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(201)
      .json({
        message: `${fullName} registered successfully`,
        accessToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Sign up error", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered yet" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user._id);

    const { accessToken, refreshToken } = token;

    return res
      .cookie("refreshToken", refreshToken, {
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(201)
      .json({
        message: `${user.fullName} logged in successfully`,
        accessToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Sign in error", error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    return res
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: `Logged out successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Sign out error", error: error.message });
  }
};
