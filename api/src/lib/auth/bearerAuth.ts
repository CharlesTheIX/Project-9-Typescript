import dotenv from 'dotenv';
import * as gbl from '../../globals';
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: './.env.local' });

export default (request: Request, response: Response, next: NextFunction): any => {
  const authHeader = request.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(gbl.status.FORBIDDEN).json(gbl.response_FORBIDDEN);
  }

  const token = authHeader.split(' ')[1];

  if (token !== process.env.AUTH_TOKEN!) return response.status(gbl.status.FORBIDDEN).json(gbl.response_FORBIDDEN);

  next();
};
