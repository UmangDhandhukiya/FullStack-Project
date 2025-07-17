const express = require("express");
const router = express.Router();
const {product,addProduct,singleProduct,updateProduct,deleteProduct} = require("../controllers/product.controller");

router.get("/products", product);
router.post("/addProduct", addProduct);
router.get("/product/:id", singleProduct);
router.put("/edit/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)

module.exports = router;
