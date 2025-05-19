import * as gbl from "../globals";
import express, { Router, Request, Response } from "express";

const healthRouter: Router = express.Router();

healthRouter.route("/").get((_: Request, response: Response): any => {
  return response.json(gbl.response_OK);
});

export default healthRouter;
