import Cart from "../models/cart.js";
import express from "express";

const router = express.Router();

router.post("/product/:id/addCart", async (req, res) => {
    const quantity = req.body;
    Product.findById(req.params.id, function (err, foundProduct) {
        if (err) {
            console.log(err);
        }
        const product = {
            item: foundProduct.id,
            qty: quantity,
            price: foundProduct.price * quantity
        }
        Cart.owner = req.customer.id;
        Cart.item.push(product);
        Cart.save();
        res.redirect("/cart");
    })
})

router.get("/", function (req, res) {
    Cart.find({ owner: req.customer.id }, function (err, userCart) {
        if (err) {
            console.log(err);
        }
        const price = userCart.items.map(p => p.price);
        const total = price.reduce((a, b) => a + b, 0);
        userCart.total = total;
        userCart.save()
        res.render("cart", { cart: userCart });
    })
})


export default router;