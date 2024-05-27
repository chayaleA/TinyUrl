import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoConnect from './DB/mongoConnect.js';
import usersRouter from './Routes/usersRoutes.js'
import linksRouter from './Routes/linksRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8787, () => {
    console.log("Server started!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/users', usersRouter);
app.use('/api/links',linksRouter);
mongoConnect();
