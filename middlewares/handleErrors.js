const mongooseError = require('mongoose').Error;
const {
  BAD_REQUEST_400, CONFLICT_409, INTERNAL_SERVER_ERROR_500,
} = require('../utils/constants');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/notFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

function handleError(error, req, res, next) {
  if (
    error instanceof mongooseError.ValidationError
    || error instanceof mongooseError.CastError
  ) {
    res.status(BAD_REQUEST_400).send({ message: error.message });
    return;
  }
  if (
    error instanceof UnauthorizedError
    || error instanceof ForbiddenError
    || error instanceof NotFoundError
  ) {
    res.status(error.statusCode).send({ message: error.message });
    return;
  }
  if (error.code === 11000) {
    res.status(CONFLICT_409).send({ message: 'email уже зарегестрирован!' });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR_500).send({ message: `${error.message}` });
  next();
}

module.exports = handleError;
