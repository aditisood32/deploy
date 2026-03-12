import { Router } from "express";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();


// REGISTER
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, "secretkey", { expiresIn: "1h" });

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;