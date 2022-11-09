import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    img: {
        type: String
    },
    name: {
        type: String
    },
    collections: {
        type: String
    },
    article: {
        type: String
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number
    },
    desc: {
        type: String
    },
    summary: {
        type: Number
    },
    total: {
        type: Number
    },

})

export default mongoose.model("Cart", CartSchema);