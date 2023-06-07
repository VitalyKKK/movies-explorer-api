const mongoose = require('mongoose');

const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Не указана страна создания фильма'],
    },
    director: {
      type: String,
      required: [true, 'Не указан режиссёр фильма'],
    },
    duration: {
      type: Number,
      required: [true, 'Не указана длительность фильма'],
    },
    year: {
      type: String,
      required: [true, 'Не указан год выпуска фильма'],
    },
    description: {
      type: String,
      required: [true, 'Не указано описание фильма'],
    },
    image: {
      type: String,
      required: [true, 'Не указана ссылка на постер фильма'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'Некорректный формат ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Не указана ссылка на трейлер фильма'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'Некорректный формат ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Не указана ссылка на миниатюрное изображение постера'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'Некорректный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Не указан _id пользователя, который сохранил фильм'],
    },
    movieId: {
      type: Number,
      required: [true, 'Не указан id фильма'],
    },
    nameRU: {
      type: String,
      required: [true, 'Не указано название фильма на русском языке'],
    },
    nameEN: {
      type: String,
      required: [true, 'Не указано название фильма на английском языке'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
