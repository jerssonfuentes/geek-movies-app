// auth.js - Manejo de login y registro

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Guardar token en localStorage
function saveToken(token) {
  localStorage.setItem("token", token);
}

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      saveToken(res.token);
      window.location.href = "movies.html";
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  });
}

// Registro
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await apiRequest("/auth/register", "POST", { name, email, password });
      alert("Registro exitoso, ahora inicia sesión.");
      window.location.href = "login.html";
    } catch (err) {
      alert("Error al registrarse");
    }
  });
}
