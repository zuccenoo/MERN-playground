import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Anonymous",
        trim: true,
        maxlength: 50,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    avatar: {
        type: String,
        default: "default",
    },
}, { timestamps: true })

export default mongoose.model("Thought", thoughtSchema)