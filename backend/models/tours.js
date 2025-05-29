import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        desc: {
            type: String, // Corrected to String
            required: true,
        },
        reviews: {
            type: String,
        },
        photo: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
