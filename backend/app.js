const express = require("express");
const app = express();
const PORT = 8080;
const connectDb = require("./DB/connectDB");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index")

connectDb();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extends: true })); // this is used when we are recive data from FORM to our body then it is used by default body is undefine if we not use this 

//routes

app.use(routes)

//set port for backend
app.listen(PORT, (req, res) => {
  console.log(`Server run on ${PORT}`);
});
