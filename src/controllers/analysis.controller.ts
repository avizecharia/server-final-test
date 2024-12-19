import { NextFunction, Request, Response } from "express";
import { getFirst, getSec } from "../services/analysis.service";



export const getFirstData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const result =  await getFirst() 
        res.json(result)
    } catch (err) {
      console.error("Can't get expenses data", err);
      next(err);
    }
  };
  export const getSecData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const result =  await getSec() 
        res.json(result)
    } catch (err) {
      console.error("Can't get expenses data", err);
      next(err);
    }
  };