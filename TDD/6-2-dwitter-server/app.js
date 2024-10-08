import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket, getSocketIO } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
import { TweetController } from "./controller/tweet.js";
import * as tweetRepository from "./data/tweet.js";

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

export async function startServer(port) {
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(cors(corsOption));
  app.use(morgan("tiny"));

  app.use(
    "/tweets",
    tweetsRouter(new TweetController(tweetRepository, getSocketIO))
  );
  app.use("/auth", authRouter);

  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
  });

  await sequelize.sync();

  console.log("Server is started....");
  const server = app.listen();
  initSocket(server);
  return server;
}

export async function stopServer(server) {
  return new Promise((resolve, reject) => {
    server.close(async () => {
      try {
        await sequelize.close();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
