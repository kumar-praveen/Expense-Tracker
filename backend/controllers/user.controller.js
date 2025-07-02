import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";

export const register = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide required details" });
    }
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const verificationCode = generateVerificationCode();
    await sendVerificationCode(email, newUser.fullname, verificationCode);
    newUser.verificationCode = verificationCode;
    await newUser.save();

    return res.status(200).json({
      message: `Verification email sent to ${email}`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const verifyOTP = async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email or otp is missing" });
  }

  try {
    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return next(new ErrorHandler("User not found", 404));
    }

    let user;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP entered" });
    }

    const currTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpires
    ).getTime();

    if (currTime > verificationCodeExpire) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has been expired" });
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save({ validateModifiedOnly: true });
    return res
      .status(200)
      .json({ success: true, message: `Welcome ${user.fullname}` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.MY_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
      .json({
        message: "User logged out successfully",
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
