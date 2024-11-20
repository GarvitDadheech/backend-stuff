"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const totalCpus = os_1.default.cpus().length;
const port = 3000;
if (cluster_1.default.isPrimary) {
    console.log("Number of CPUs are: ", totalCpus);
    console.log("Primary Process is running at PID: ", process.pid);
    for (let i = 0; i < totalCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(worker, " died on process ", process.pid);
        //To fork another worker
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.get("/", (req, res) => {
        res.send("Used Clustersss!");
    });
    app.get("/api/:n", (req, res) => {
        let num = parseInt(req.params.n);
        let c = 0;
        for (let i = 0; i <= num; i++) {
            c += i;
        }
        res.send(`Final count is ${c} on PID ${process.pid}`);
    });
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}
