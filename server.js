const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const SESSION_SECRET = "REPLACE_WITH_RANDOM_SECRET";
const otpMap = new Map();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yuvi252004@gmail.com",        // your Gmail
    pass: "yvfzgwkffhjkgchu"        // your App Password (not Gmail password!)
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email || !/@gmail\.com$/.test(email)) {
    return res.json({ success: false, message: "Only Gmail addresses allowed." });
  }
  const otp = generateOTP();
  otpMap.set(email, otp);
  try {
    await transporter.sendMail({
      from: '"Dashboard Login" <yuvi252004@gmail.com>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: "Email failed: " + err.message });
  }
});
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpMap.get(email) === otp) {
    otpMap.delete(email);
    const token = jwt.sign({ email }, SESSION_SECRET, { expiresIn: "2h" });
    res.json({ verified: true, token });
  } else {
    res.json({ verified: false, message: "Invalid OTP" });
  }
});
app.get('/api/check-auth', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    res.json({ ok: true, email: decoded.email });
  } catch (e) {
    res.status(401).json({ ok: false });
  }
});
app.listen(5000, () => console.log('OTP/email backend running on http://localhost:5000'));
