const { Product } = require("../model/Product");
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const product = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "Product successfully fetched",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internam server error" });
  }
};

const addProduct = async (req, res) => {
  try {
    let { name, price, brand, image, desc, stock } = req.body;
    let { token } = req.headers;
    console.log(token);
    let decodedToken = jwt.verify(token, "supersecret");

    let user = await User.findOne({ email: decodedToken.email });

    const product = await Product.create({
      name,
      price,
      brand,
      image,
      desc,
      stock,
      user: user._id,
    });

    return res.status(200).json({
      message: "Product inserted successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internam server error" });
  }
};

const singleProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "id not found" });
    }

    let { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product found successfully",
        product: product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internam server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, price, image, desc, stock, brand } = req.body;
    let { token } = req.headers;

    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });

    if (user) {
      let productUpdate = await Product.findByIdAndUpdate(id, {
        name,
        price,
        image,
        desc,
        brand,
        stock
      },{new:true});
      console.log(productUpdate)
      return res.status(200).json({
        message: "Updated successfully",
        product: productUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal serevr error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let { token } = req.headers;

    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });

    if (user) {
      const productUpdate = await Product.findByIdAndDelete ( id );
      return res.status(200).json({
        message: "delete successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal serevr error" });
  }
};

module.exports = { product, addProduct, singleProduct, updateProduct, deleteProduct };
