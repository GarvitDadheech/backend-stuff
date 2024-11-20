import express from 'express';
import cluster from 'cluster';
import os from 'os';

const totalCpus = os.cpus().length;

const port = 3000;

if(cluster.isPrimary) {
    console.log("Number of CPUs are: ",totalCpus);
    console.log("Primary Process is running at PID: ",process.pid);

    for(let i=0;i<totalCpus;i++) {
        cluster.fork();
    }

    cluster.on("exit",(worker,code,signal) => {
        console.log(worker, " died on process ",process.pid);
        //To fork another worker
        cluster.fork();
    })
} else {
    const app = express();

    app.get("/",(req,res) => {
        res.send("Used Clustersss!")
    })

    app.get("/api/:n",(req,res) => {
        let num = parseInt(req.params.n);
        let c = 0;
        for(let i=0;i<=num;i++) {
            c+=i;
        }
        res.send(`Final count is ${c} on PID ${process.pid}`);
    })

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}
