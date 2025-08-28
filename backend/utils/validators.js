import Joi from "joi";

/**
 * Esquema de validación para usuarios
 */
export const userValidator = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * Esquema de validación para películas
 */
export const movieValidator = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(10).required(),
  releaseDate: Joi.date().required(),
  category: Joi.string().required(),
});

/**
 * Esquema de validación para reviews
 */
export const reviewValidator = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).optional(),
  movie: Joi.string().required(),
  user: Joi.string().required(),
});
