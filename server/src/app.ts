import express from "express";
import config from "config";
import cors from "cors";
import routes from "./routes";
import db from "./db";

const app = express();

app.use(
  cors({
    origin: config.get("corsOrigin"),
  })
);

const port = config.get("port") as number;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(port, "0.0.0.0", () => {
  console.log(`Application listening at http://localhost:${port}`);
  db();
  routes(app);
});
