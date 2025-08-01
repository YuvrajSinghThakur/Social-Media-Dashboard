﻿# Social-Media-Dashboard

A modern, responsive, and secure social media analytics dashboard project.

Gmail OTP Login with Node.js backend (protects dashboard)

JWT-based session protection (auto-redirect to login if not authenticated)

Responsive, Material Design Dashboard (HTML, CSS, JS)

Sidebar navigation, card stats, platform switching

Dark mode toggle and logout button

Vanilla frontend (no frameworks), fast to deploy

Features
Login with OTP: Users log in via one-time password sent to their Gmail (secure, no passwords stored).

Protected Dashboard: Only authenticated users may view dashboard stats.

Sidebar Navigation: Switch sections: Overview, Twitter, Instagram, Facebook.

Responsive Cards: Dashboard cards are clickable and update (demo data).

Dark/Light Mode: One-click toggle (remembers preference).

Logout Button: Secure sign-out with one click.

Mobile-Friendly: Looks great on any device.

Project Structure
text
/
├── index.html         # Secure dashboard UI (stats, dark mode, etc)
├── login.html         # Login page for Gmail OTP
├── style.css          # Unified styles for dashboard/login/dark mode
├── script.js          # Dashboard JS logic (sidebar, darkmode, stats)
├── login.js           # Login+OTP page frontend logic
├── server.js          # Node.js backend for OTP and session auth
├── package.json       # Backend dependencies
└── README.md          # Documentation (this file)
Setup & Usage
1. Backend Setup (OTP & Auth Server)
Install Node.js if not already installed: https://nodejs.org/

Enable 2-Step Verification on your Gmail and generate a Gmail App Password.

Replace user/pass in server.js with your Gmail and 16-character app password (no spaces).

Install backend deps (in backend folder):

text
npm install
Start backend server:

text
node server.js
The backend will run at: http://localhost:5000

2. Frontend Setup
Open login.html in your browser.

Enter your Gmail, click "Send OTP".

Check your email for the OTP code.

Enter it to log in.

Dashboard (index.html) auto-protects (will re-route to login if not authenticated).

Developer Notes & Customization
Session Storage: JWT is stored in browser localStorage upon login.

Security: Never use your real Gmail password; ALWAYS a Gmail App Password.

Change SESSION_SECRET in server.js to anything long/random for production.

Stats: Demo data can be connected to real APIs or databases.

Styling: All theming and layout are in style.css—easy to customize.

Logout: Logs out and returns to login page.

Troubleshooting
OTP not received?

Check spam/junk mail.

Review Gmail App Password in server.js.

Confirm backend is running, no errors.

CORS errors or can't connect?

Ensure backend is running on localhost:5000.

Login won't work?

Only Gmail addresses (@gmail.com) are accepted by default.

Screenshots
Add screenshots or demo GIFs here!

License
MIT — Free for personal, demo, or educational use.
Adapt and remix for commercial use with your own adjustments.

Contributing
Fork, clone, and open pull requests!
Feedback, bug reports, and feature suggestions are welcome.

Credits
Node.js, Express, Nodemailer, JWT, CORS

Icons: Google Material Icons

Code and structure: [YourName / Team / Organization]

Let me know if you want to add example images, usage GIFs, deploy instructions, or customization notes!
