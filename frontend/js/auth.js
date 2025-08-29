const API_URL = "http://localhost:4000/api/auth";

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;

  if (res.ok) {
    localStorage.setItem("token", data.token);
    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  }
});

// Registro
document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = prompt("Correo:");
  const username = prompt("Usuario:");
  const password = prompt("Contraseña:");
  
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await res.json();
  alert(data.message);
});

// Admin directo
document.getElementById("adminBtn").addEventListener("click", async () => {
  const email = prompt("Correo admin:");
  const password = prompt("Contraseña:");
  
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok && data.role === "admin") {
    localStorage.setItem("token", data.token);
    window.location.href = "admin.html";
  } else {
    alert("No eres administrador");
  }
});
