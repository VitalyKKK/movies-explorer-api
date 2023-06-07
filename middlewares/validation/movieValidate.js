const { celebrate, Joi } = require('celebrate');
const { regExLink } = require('../../utils/constants');

const validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regExLink),
    trailerLink: Joi.string().required().regex(regExLink),
    thumbnail: Joi.string().required().regex(regExLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateMovieData,
  validateMovieId,
};
