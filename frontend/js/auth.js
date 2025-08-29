const form = document.getElementById("authForm");
const toggleLink = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");

let isLogin = true;

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Iniciar Sesión";
    submitBtn.textContent = "Iniciar Sesión";
    toggleLink.textContent = "Regístrate aquí";
  } else {
    formTitle.textContent = "Registrarse";
    submitBtn.textContent = "Registrarse";
    toggleLink.textContent = "Inicia sesión aquí";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const endpoint = isLogin ? "http://localhost:4000/api/auth/login" : "http://localhost:4000/api/auth/register";
  const body = { email, password };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert(isLogin ? "Inicio de sesión exitoso" : "Registro exitoso");
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html"; // redirige al inicio
      }
    } else {
      alert(data.msg || "Error en la petición");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión con el servidor");
  }
});
