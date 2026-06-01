exports.requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

exports.error = (message) => {
  console.error(message);
};
