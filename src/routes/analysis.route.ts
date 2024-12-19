import { Router } from "express";
import {
  getFirstData,
  getSecData,
  getThirdData,
} from "../controllers/analysis.controller";

const router = Router();

router.get("/deadliest-attack-types", getFirstData);
router.get("/highest-casualty-regions", getSecData);
router.get("/incident-trends", getThirdData);

export default router;
