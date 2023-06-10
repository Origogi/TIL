import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import 'express-async-errors';
import tweetRouter from './router/tweets.js';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets', tweetRouter);

app.use((req, res, next) => {
    console.log("not found");
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});

app.listen(8080);
