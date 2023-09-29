import mongoose, { Schema } from "mongoose";
import modelOption from "./model.option.js";

export default mongoose.model(
    "Favorite",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            require: true
        },
        mediaTitle: {
            type: String,
            require: true
        },
        mediaId: {
            type: String,
            require: true
        },
        mediaPoster: {
            type: String,
            require: true
        },
        mediaRate: {
            type: Number,
            require: true
        },
    }, modelOption)
);