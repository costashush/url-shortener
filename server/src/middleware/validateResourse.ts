import { AnyObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";
import config from "config";

const domain = config.get("corsOrigin") as String;

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.destination.indexOf(domain) != -1) {
      req.body.isShortUrl = true;
    }
    try {
      await resourceSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      return res.status(400).send(e);
    }
  };

export default validateResource;
