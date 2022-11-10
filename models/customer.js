import mongoose from "mongoose";
import { testRegex } from "../utils/regexFunctions.js";

const CustomerSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
    },
    phone: {
        type: Number,
        minLength: 11,
        maxLength: 15,
    },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return testRegex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, email);
            },
            message: "A valid email is required",
        },
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    terms: {
        type: Boolean,
        //required: true
    }
})

export default mongoose.model("Customer", CustomerSchema);