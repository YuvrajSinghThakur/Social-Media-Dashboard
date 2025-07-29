const sendBtn = document.getElementById("send-otp-btn");
const verifyBtn = document.getElementById("verify-otp-btn");
const emailField = document.getElementById("email");
const otpField = document.getElementById("otp");
const loginMsg = document.getElementById("login-message");
const otpForm = document.getElementById("otp-form");
const loginForm = document.getElementById("login-form");

function showMsg(msg, type = "info") {
  loginMsg.innerHTML = `<span class="${type === "error" ? 'error-message' : 'otp-message'}">${msg}</span>`;
}

sendBtn.onclick = async function() {
  const email = emailField.value.trim();
  if (!email || !email.endsWith("@gmail.com")) {
    showMsg("Enter a valid Gmail address.", "error");
    return;
  }
  showMsg("Sending OTP...", "info");
  let res = await fetch("http://localhost:5000/api/send-otp", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  let data = await res.json();
  if (data.success) {
    loginForm.style.display = "none";
    otpForm.style.display = "block";
    showMsg("OTP sent to your Gmail. Please check your inbox.");
    emailField.setAttribute("disabled", "disabled");
  } else {
    showMsg(data.message || "Failed to send OTP.", "error");
  }
};

verifyBtn.onclick = async function() {
  const email = emailField.value.trim();
  const otp = otpField.value.trim();
  if (otp.length < 4) {
    showMsg("Enter the OTP sent to your Gmail.", "error");
    return;
  }
  showMsg("Verifying OTP...");
  let res = await fetch("http://localhost:5000/api/verify-otp", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  let data = await res.json();
  if (data.verified && data.token) {
    localStorage.setItem("dashboard_jwt", data.token);
    showMsg("Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1600);
  } else {
    showMsg(data.message || "Incorrect OTP. Try again.", "error");
  }
};
