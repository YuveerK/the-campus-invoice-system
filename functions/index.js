const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
app.listen(2000, () => {
  console.log("listening");
});

app.use(
  cors({
    origin: [
      "http://169.1.238.73:3000",
      "http://192.168.50.24:3000",
      "http://localhost:3000",
      "http://169.1.238.73",
      "http://192.168.50.24",
      "http://localhost",
    ],
  })
);

app.get("/send-email", (req, res) => {
  sendEmail();
});

async function sendEmail(filePath, fileName) {
  // Create a Nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yuveerkallideen@gmail.com",
      pass: "Stickydecks01", // Replace with your actual password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "yuveerkallideen@gmail.com",
    to: "yuveerkal01@gmail.com", // Replace with the recipient's email address
    subject: "Email with PDF attachment",
    text: "Please find attached the PDF file.",
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true; // Indicate that the email was sent successfully
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return false; // Indicate that an error occurred while sending the email
  }
}
