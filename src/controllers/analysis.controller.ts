import { NextFunction, Request, Response } from "express";
import {
  getFirst,
  getSecAll,
  getThirdAll,
} from "../services/analysis.service";
import { createAttack, delAttack } from "../services/crud.service";

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

export const postAttack = async (
  req: Request<any,any,any>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await createAttack(req.body));
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const deleteAttack = async (
  req: Request<any,any,any>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    res.json(await delAttack(req.body));
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
