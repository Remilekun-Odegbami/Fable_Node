import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: [],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

export default mongoose.model("Product", ProductSchema);