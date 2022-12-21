import express from "express";
import cors from "cors";
import chalk from "chalk";
import router from "./routers";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import session from "express-session";

async function main() {
  const app = express();

  config();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/", router);
  app.use(
    session({
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
        secure: false,
      },
    })
  );

  app.listen(process.env.PORT, () =>
    console.log(chalk.blue(`Server is running on port ${process.env.PORT}`))
  );
}

main();
