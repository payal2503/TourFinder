import express from "express";
import multer from 'multer';
import Tour from "../models/tours.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";
import Booking from "../models/Booking.js";
import { OAuth2Client } from 'google-auth-library';
import { GoogleLogin } from "../server.js";

const client = new OAuth2Client(GoogleLogin);

const router = express.Router();
const storage = multer.memoryStorage(); // In-memory upload
const upload = multer({ storage });

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Received Google token:", token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '125461439203-qrrdokv68hr0f1fgic6ul7o01sfh5bvp.apps.googleusercontent.com', // Replace with real one
    });

    const payload = ticket.getPayload();
    console.log("Decoded Google payload:", payload);

    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        password: '',
        photo: picture,
      });
      await user.save();
      console.log("New user saved:");
    } else {
      console.log("Existing user found:");
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username
      },
      "secretKey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token: jwtToken });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(401).json({ message: "Invalid Google token", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving message" });
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tours", error });
  }
});  
router.post('/bookings', async (req, res) => {
  try {
    const { tourId, tourTitle, userName, visitDate, visitors } = req.body;

    if (!tourId || !tourTitle || !userName  || !visitDate || !Array.isArray(visitors) || visitors.length === 0) {
      return res.status(400).json({ error: "All fields and at least one visitor are required" });
    }

    for (const visitor of visitors) {
      if (!visitor.name || !visitor.age) {
        return res.status(400).json({ error: "Each visitor must have a name and age" });
      }
    }

    const newBooking = new Booking({
      tourId,
      tourTitle,
      userName,
      visitDate,
      visitors,
    });

    await newBooking.save();
    res.status(201).json({ message: "Tour booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to book tour", details: error.message });
  }
});  
router.get('/bookings/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const bookings = await Booking.find({ userName: username });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
router.put('/profile/:username', upload.single('photo'), async (req, res) => {
  try {
    const { username } = req.params;

    const updatedFields = {
      email: req.body.email,
    };

    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      updatedFields.photo = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
