import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
const allowedOrigin = process.env["FRONTEND_ORIGIN"];

app.use(
  cors({
    origin: allowedOrigin ? allowedOrigin : true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug: log all /api requests so we can verify routing at runtime
app.use("/api", (req, _res, next) => {
  logger.info({ method: req.method, url: req.url }, "[api-server] /api request");
  next();
});
app.use("/api", router);

export default app;
