const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description,
      image, trailerLink, thumbnail, movieId, nameRU, nameEN,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidatorError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным id не найдена');
    }
    if (movie.owner.toHexString() !== req.user._id) {
      throw new ForbiddenError('Фильм с указанным id не является вашей');
    }
    await Movie.deleteOne(movie);
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
