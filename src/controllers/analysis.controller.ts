import { NextFunction, Request, Response } from "express";
import {
  getFirst,
  getSecAll,
  getSecRegion,
  getThirdAll,
} from "../services/analysis.service";

export const getFirstData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFirst();
    res.json(result);
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
    const result = await getSecAll();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getsecRData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json([await getSecRegion("North America")]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getThirdData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getThirdAll();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};
