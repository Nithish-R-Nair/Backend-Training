import express from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./loggerMiddleware";
import dataSource from "./db/data-source";

const { Client } = require('pg');

const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employees", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

(async () => {
  try {
    await dataSource.initialize();
    console.log("Connected to DB");
  } catch {
    console.error("Failed to connect to DB");
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
  });
})();