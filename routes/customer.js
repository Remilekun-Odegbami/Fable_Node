import express from "express";
const router = express.Router();

import Customer from "../models/customer.js";

// Create Customer
router.post('/', async (req, res) => {
    const newCustomer = new Customer(req.body);
    try {
        const savedCustomer = await newCustomer.save();
        res.status(200).json({
            message: "New Customer was created successfully",
            data: savedCustomer,
            success: 1
        });
    } catch (err) {
        res.status(409).json({
            err,
            message: "Customer not created",
            success: 0
        });
    }

})


//Update Customer
router.put("/:id", async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ); //$set: req.body is a mongoDb set method that enables one get an individual id
        res.status(200).json({
            message: "Customer updated successfully.",
            data: updatedCustomer,
            success: 1,
        });
    } catch (err) {
        res.status(500).json({
            err,
            message: "Customer not updated",
            success: 0
        });;
    }
})

//Delete Customer
router.delete("/:id", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Customer has been deleted successfully",
            data: customer,
            success: 1,
        })
    } catch (err) {
        res.status(500).json({
            message: "Customer not deleted. Please try again",
            success: 0
        });
    }
})

// Get Customer
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json({
            message: "Customer",
            data: customer,
            success: 0
        });
        if (req.params.id == null) {
            res.status(404).json({
                message: "Customer does not exist",
                success: 0
            });
        }
    } catch (err) {
        res.status(500).json({
            err,
            message: "Cannot get Customer. Please check your connection",
            success: 0
        });
    }
})

// Get Customers
router.get('/', async (req, res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json({
            message: "Customers",
            data: customer,
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