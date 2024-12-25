import { Request, Response, Router } from "express";
import {
  deleteAttack,
  getFirstData,
  getSecData,
  getThirdData,
  postAttack,
} from "../controllers/analysis.controller";

const router = Router();

router.get("/deadliest-attack-types", getFirstData);
router.get("/highest-casualty-regions", getSecData);
router.get("/incident-trends", getThirdData);
router.get("/f", getSecData);
export default router;
