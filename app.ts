import express from "express";
import employeeRouter from "./routes/employee.route";
import departmentRouter from "./routes/department.route";
import loggerMiddleware from "./middlewares/logger.middleware";
import dataSource from "./db/data-source";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import authRouter from "./routes/auth.route";
import authMiddleware from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";

const server = express();
const logger = LoggerService.getInstance("app()");

server.use(express.json());
server.use(loggerMiddleware);

server.use("/auth", authRouter);
server.use("/employees", authMiddleware, employeeRouter);
server.use("/departments", departmentRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

server.use(errorHandlerMiddleware);

(async () => {
  try {
    await dataSource.initialize();
    logger.info("Connected to DB");
  } catch {
    logger.error("Failed to connect to DB");
    process.exit(1);
  }
  server.listen(3000, () => {
    logger.info("Server running on port http://localhost:3000");
  });
})();