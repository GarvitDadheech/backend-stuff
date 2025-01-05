import express, { NextFunction, Request, Response } from "express";
import { Histogram } from "prom-client";
import client from "prom-client";

const app = express();
app.use(express.json());

const histogram = new Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});

export const durationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    histogram.observe({}, duration);
  });
  next();
};

app.use(durationMiddleware);

app.get("/info", async (req, res) => {
  res.status(200).send({
    name: "Garvit",
    age: 20,
  });
});

app.get("/todos", async (req, res) => {
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
