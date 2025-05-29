import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  tourTitle: { type: String, required: true },
  userName: { type: String, required: true },
  visitDate: { type: String, required: true },
  visitors: [{ name: String, age: Number }], // Array of visitors
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
