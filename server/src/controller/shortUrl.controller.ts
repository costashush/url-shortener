import { Request, Response } from "express";
import url from "url";
import querystring from "querystring";

import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  // Get the destination from the request body
  const { destination } = req.body;

  // Create a shortUrl
  const newUrl = await shortUrl.create({ destination });

  return res.send(newUrl);
}

export async function getLongUrl(req: Request, res: Response) {
  // Get the destination from the request body
  const { destination } = req.body;

  //get path name
  const path = new URL(destination);

  // Create a shortUrl
  const longUrl = await shortUrl.findOne({
    shortId: path.pathname.replace("/", ""),
  });

  if (!longUrl) {
    return res.sendStatus(404);
  }
  console.log(longUrl);
  return res.send(longUrl);
}

export async function handleRedirect(req: Request, res: Response) {
  const { shortId } = req.params;

  const short = await shortUrl.findOne({ shortId }).lean();

  if (!short) {
    return res.sendStatus(404);
  }

  analytics.create({ shortUrl: short._id });

  return res.redirect(short.destination);
}

export async function getAnalytics(req: Request, res: Response) {
  const data = await analytics.find({}).lean();

  return res.send(data);
}

export async function getShortUrl(req: Request, res: Response) {
  const { shortId } = req.params;
  const short = await shortUrl.findOne({ shortId }).lean();

  if (!short) {
    return res.sendStatus(404);
  }

  return res.json(short);
}
