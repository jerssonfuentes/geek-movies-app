// movies.js - Listado y filtros de películas

const moviesContainer = document.getElementById("moviesContainer");
const filterForm = document.getElementById("filterForm");

// Renderizar películas
function renderMovies(movies) {
  moviesContainer.innerHTML = movies.map(
    (m) => `
      <div class="movie-card">
        <img src="${m.poster}" alt="${m.title}">
        <h3>${m.title}</h3>
        <p>${m.genre}</p>
        <button onclick="viewDetail('${m._id}')">Ver más</button>
      </div>
    `
  ).join("");
}

// Obtener todas las pelis
async function loadMovies(filters = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const movies = await apiRequest(`/movies?${query}`);
    renderMovies(movies);
  } catch (err) {
    console.error("Error cargando películas", err);
  }
}

// Redirigir al detalle
function viewDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

// Filtros
if (filterForm) {
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const genre = e.target.genre.value;
    loadMovies({ genre });
  });
}

// Inicial
if (moviesContainer) loadMovies();
