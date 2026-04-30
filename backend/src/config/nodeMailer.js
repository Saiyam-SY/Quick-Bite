import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtp = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: "ydvsaiyam001@gmail.com", // sender address
      to, // list of recipients
      subject: "OTP to Reset Password", // subject line
      html: `Here's your OTP <b>${otp}</b>. It will expire in 5 minuter`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
