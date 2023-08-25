// lib/auth.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12312312312asdasdasd";

export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: any) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
