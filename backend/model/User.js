const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref:"Cart",
  },
});

const User = mongoose.model("User",userSchema);
module.exports = {User}