const nodeMailer = require("nodemailer");
const { product } = require("../controllers/product.controller");

const sendEmail = async (userEmail, productArray) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      paas: process.env.PASSWORD,
    },
  });

  //PREPARE PRODUCT DETAILS IN TEXT FORMAT

  const productDetails = productArray.map((product, index) => {
    `${index + 1},Name:${product.name}.Price:${product.price}`;
  });

  //setup mail content

  const mailOption = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "YOur order Details",
    Text: `Thanks for your purchase! \n\n here is your product details ${productDetails}`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;
