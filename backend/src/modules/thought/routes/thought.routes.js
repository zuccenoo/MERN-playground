import { Router } from "express";
import { getThoughts, createThought } from "../controllers/thought.controller.js";

const router = Router();

router.get("/", getThoughts);
router.post("/", createThought);

export default router;