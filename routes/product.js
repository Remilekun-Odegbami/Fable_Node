
import express from "express";
const router = express.Router();

import imageUpload from "../middleware/upload/imageStorage.js";
import Product from "../models/product.js";


// Create product
router.post('/', imageUpload.array("image"), async (req, res) => {
    const images = []
    for (let index = 0; index < req.files.length; index++) {
        images.push(req.files[index].path)
    }
    const newProduct = new Product({ ...req.body, image: images });
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({
            message: "New Product was created successfully",
            data: savedProduct,
            success: 1
        });
    } catch (err) {
        res.status(409).json({
            err,
            message: "Product not created",
            success: 0
        });
    }

})


//Update Product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            message: "Product updated successfully.",
            data: updatedProduct,
            success: 1,
        });
    } catch (err) {
        res.status(500).json({
            err,
            message: "Product not updated",
            success: 0
        });;
    }
})

//Delete Product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Product has been deleted successfully",
            data: product,
            success: 1,
        })
    } catch (err) {
        res.status(500).json({
            message: "Product not deleted. Please try again",
            success: 0
        });
    }
})

// Get Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            message: "Product",
            data: product,
            success: 0
        });
        if (req.params.id == null) {
            res.status(404).json({
                message: "Product does not exist",
                success: 0
            });
        }
    } catch (err) {
        res.status(500).json({
            err,
            message: "Cannot get product. Please check your connection",
            success: 0
        });
    }
})

// Get Products
router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json({
            message: "Products",
            data: product,
            success: 1,
        });
    } catch (err) {
        res.status(500).json({
            err,
            message: "Cannot get posts at this time. Please check your connection",
            success: 0
        });
    }
})


export default router;