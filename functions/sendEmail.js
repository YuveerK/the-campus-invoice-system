const nodemailer = require("nodemailer");

async function sendEmail() {
  // Create a Nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "yuveerkal@hotmail.com",
      pass: "#172912#17CraneStreetSunCity@2023", // Replace with your actual password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "yuveerkal@hotmail.com",
    to: "yuveerkal01@gmail.com", // Replace with the recipient's email address
    subject: "Email with PDF attachment",
    text: "Please find attached the PDF file.",
    // attachments: [
    //   {
    //     filename: "document.pdf", // Replace with the desired filename
    //     path: filePath,
    //   },
    // ],
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

module.exports = sendEmail;
