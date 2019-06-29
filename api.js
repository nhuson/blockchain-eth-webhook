require("dotenv").config({ path: ".env" });
import express from "express";
import mongoose from "./lib/mongoose";
import cors from "cors";
import createError from "http-errors";
import api from "./routes/api";
import errorHandle from "./lib/handlerError";
import crossOrigin from "./lib/crossOrigin";

/** Connect to mongoo */

mongoose();

/** Create app express */
const app = express();
app.use("/api", api);
app.use(cors);
app.use(crossOrigin);

/** catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/** Handler errors */
app.use(errorHandle);

app.listen(process.env.API_PORT || 3000, () => {
  console.log(
    `API server is running.... on port ${process.env.API_PORT || 3000}`
  );
});
