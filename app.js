import express from "express";
import dotenv from "dotenv";
dotenv.config('.');

import cors from "cors";
import helmet from "helmet";
const app = express();

import mongoose from "mongoose";

import productRoute from "./routes/product.js";
import customerRoute from "./routes/customer.js";
import cartRoute from "./routes/cart.js";

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("connected to MongoDb"))
    .catch(err => console.log(err));

// const corsOption = {
//     origin: [
//         "http://localhost:3000",
//         "https://fable-ten.vercel.app/"
//     ],
//     method: "GET, POST, DELETE, PUT, PATCH",
// }

app.use(helmet());
app.use(cors());
//app.use(cors(corsOption));

app.use("/api/products", productRoute);
app.use("/api/customer", customerRoute);
app.use("/api/cart", cartRoute);


const port = "5000"
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
})
