exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ msg: "Internal Server Error" });
  } else next(err);
};
