import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sentOtpMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Rest Your Password",

      html: `<p>
        Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.
      </p>`,
    });
    console.log(`otp sent successfully`);
  } catch (error) {
    console.log(`error while sending otp ${error}`);
  }
};
