import { Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export const userMiddleware = (req: any, res: Response, next: Function) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Not authorised' });
    }
    const data = jwt.verify(token, config.get('jwtSecret'));
    req.user = data;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Not authorised' });
  }
};