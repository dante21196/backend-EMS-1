import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../config/response';

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  try{
    console.log("Request body is the ",req.body)
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, 'Name, email, and password are required', 400);
  }
    next();


  }catch(error){
    console.log("Some error occured")
    return errorResponse(res, 'Name, email, and password are required', 400);
  next();

  }
};
