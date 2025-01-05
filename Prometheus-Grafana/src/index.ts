import express, { NextFunction, Request, Response } from "express";
import { Counter } from "prom-client";
import client from "prom-client";

const app = express();
app.use(express.json());

let counter = new Counter({
  name: "numberOfRequests",
  help: "Number of requests made",
  labelNames: ["route", "method", "status_code"],
});

const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction ) => {
  res.on("finish", () => {
    counter.inc({
      route: req.path,
      method: req.method,
      status_code: res.statusCode,
    });
  });
  next();
};

app.use(requestCounterMiddleware);

app.get("/info", (req, res) => {
  res.status(200).send({
    name: "Garvit",
    age: 20,
  });
});

app.get("/todos", (req, res) => {
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

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
