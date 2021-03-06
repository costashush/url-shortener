import { Express, Request, Response } from "express";
import {
  createShortUrl,
  handleRedirect,
  getAnalytics,
  getShortUrl,
  getLongUrl,
} from "../controller/shortUrl.controller";
import validateResourse from "../middleware/validateResourse";
import shortUrlSchema from "../schemas/createShortUrl.schema";
import config from "config";

const domain = config.get("corsOrigin") as String;

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.send("App is healthy");
  });

  app.post("/api/url", validateResourse(shortUrlSchema), function (req, res) {
    req.body.isShortUrl = false;
    if (req.body.destination.indexOf(domain) != -1) {
      req.body.isShortUrl = true;
      getLongUrl(req, res);
    } else {
      createShortUrl(req, res);
    }
  });

  app.get("/:shortId", handleRedirect);

  app.get("/api/url/:shortId", getShortUrl);

  app.get("/api/analytics", getAnalytics);
}

export default routes;
