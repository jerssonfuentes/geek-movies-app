const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("category");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener películas", error });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("category");
    if (!movie) return res.status(404).json({ message: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener película", error });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al crear película", error });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie)
      return res.status(404).json({ message: "Película no encontrada" });

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar película", error });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Película no encontrada" });

    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar película", error });
  }
};
