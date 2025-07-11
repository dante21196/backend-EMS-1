import { Request, Response, NextFunction } from 'express';

export const testReqBody = (req: Request, res: Response, next: NextFunction) => {
  
  try {
    console.log("Logging request body for debug :",req.body)
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Some Error Occured!' });
  }
};
