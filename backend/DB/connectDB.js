const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
  .then(()=>{
    console.log("server is coonected with db");
    
  })
  .catch(()=>{
    console.log("Db not connected");
    
  })
}

module.exports = connectDB;