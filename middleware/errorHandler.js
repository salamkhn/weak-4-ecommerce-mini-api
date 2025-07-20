export const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    message: `internal server error :, ${err.message}`,
  });
};
