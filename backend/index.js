import express from "express";
import mongoose from "mongoose";
import { PORT, DataBase } from "./server.js";
import cors from "cors";
import tourRoutes from "./routes/tour.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", tourRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("APP is running");
});

mongoose
  .connect(DataBase)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
