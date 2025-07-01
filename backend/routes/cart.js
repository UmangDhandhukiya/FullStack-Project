const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { route } = require("./product")
const {cart, addToCart, updateCart, payment} = require("../controllers/cart.controller")

//route for get cart
router.get("/userCart",cart)

//route for add product to cart
router.post("/addToCart",addToCart)

//for update cart
router.put("/updateCart",updateCart)

//stripe
router.post("/payment",payment)

module.exports = router