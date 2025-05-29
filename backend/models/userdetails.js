import mongoose from "mongoose";

const userdetails = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
          },
       about: {
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
        unique: true,
       },
       photo: {
        type: String,
       },
    },
    {timestamps : true}
);

export default mongoose.model("UserDetails", userdetails);