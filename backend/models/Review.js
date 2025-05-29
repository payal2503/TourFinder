import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: " ",
    },
    role: {
      type: String,
      default: "user", 
      enum: ["user", "admin"], 
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    tours: [
      {
        title: String,
        date: Date,
        image: String,
      },
    ],
    reviews: [
      {
        text: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UserDetails", userDetailsSchema);
