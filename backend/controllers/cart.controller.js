const jwt = require("jsonwebtoken");
const { Cart } = require("../model/Cart");
const { User } = require("../model/User");
const { Product } = require("../model/Product");

const cart = async (req, res) => {
  try {
    let { token } = req.headers;

    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products",
        model: "Product",
      },
    });

    if (!user) {
      res.status(400).json({
        message: "user Not Found",
      });
    }

    res.status(200).json({
      message: "cart created successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal serevr error" });
  }
};

const addToCart = async (req, res) => {
  try {
    let { productId, qty } = req.body;
    let { token } = req.headers;
    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });

    if (!productId || !qty) {
      res.status(400).json({ message: "some field are missing" });
    }

    if (user) {
      const product = await Product.findById(productId);
      const cart = await Cart.findOne({ _id: user.cart_id });

      if (cart) {
        const exists = cart.products.some((p) => {
          p.product.toString() === product.toString();
        });

        if (exists) {
          return res.status(404).json({
            message: "Go to Cart",
          });
        }
        cart.products.push({ product: productId });
        cart.total += product.price * qty;
        await cart.save();
      } else {
        const newCart = await Cart.create({
          products: [
            {
              product: productId,
              qty: qty,
            },
          ],
          total: product.price * qty,
        });
        user.cart = newCart._id;
        await user.save();
      }
      return res.status(200).json({ message: "product added successfully" });
    }

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal serevr error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const { token } = req.headers;

    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: { path: "products.product", model: "Product" },
    });

    if (!user || !user.cart) {
      res.status(404).json({
        message: "cart not found",
      });
    }

    const cart = user.cart;
    const item = cart.products.find(
      (p) => p.product._id.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = item.product.price * item.qty;
    
    //action logic
    if (action === "increase") {
      item.qty += 1;
      cart.total += totalPrice;
    } else if (action === "decrease") {
      if (item.qty > 1) {
        item.qty -= 1;
        cart.total -= totalPrice;
      } else {
        cart.total -= totalPrice;
        cart.products = cart.products.filter(
          (p) => p.product._id.toString() !== productId
        );
      }
    } else if (action === "remove") {
      cart.total -= totalPrice * item.qty;
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId
      );
    } else {
      res.status(400).json({ message: "Please enter valid operation" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { cart, addToCart, updateCart };
