import express from 'express';
import { db } from './db';
const app  = express();
app.use(express.json());

app.post('/sum', async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a + b;

    await db.function.create({
        data: {
            name: 'sum',
            a,
            b,
            type : 'ADD',
            ans: answer
        }
    });

    res.json({
        answer
    });
});

app.post('/multiply', async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a * b;

    await db.function.create({
        data: {
            name: 'multiply',
            a,
            b,
            type : 'MULTIPLY',
            ans: answer
        }
    });
    res.json({
        answer
    });
});

export default app;