// server/config/config.js
import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  jwtSecret: process.env.JWT_SECRET || "defaultsecret",
};
