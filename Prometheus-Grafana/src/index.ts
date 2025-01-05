import express from "express";
import { Counter } from "prom-client";
import client from "prom-client";

const app = express();
app.use(express.json());

let counter = new Counter({
  name: "numberOfRequests",
  help: "Number of requests made",
  labelNames: ["method"],
});

app.get("/info", (req, res) => {
  counter.inc();
  res.send({
    name: "Garvit",
    age: 20,
  });
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
