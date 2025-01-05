import express, { NextFunction, Request, Response } from "express";
import { Gauge } from "prom-client";
import client from "prom-client";

const app = express();
app.use(express.json());

const activeUsers = new Gauge({
  name: "active_users",
  help: "Number of active users",
});

const activeUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  activeUsers.inc();
  res.on("finish", () => {
    activeUsers.dec();
  });
  next();
};

app.use(activeUserMiddleware);

app.get("/info", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  res.status(200).send({
    name: "Garvit",
    age: 20,
  });
});

app.get("/todos", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  res.status(200).send([
    {
      id: 1,
      name: "Garvit",
    },
    {
      id: 2,
      name: "Dadheech",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
