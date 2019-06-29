import logger from "../lib/logger";
export default (err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500);
  res.json({
    success: "failed",
    message: err.message
  });
};
