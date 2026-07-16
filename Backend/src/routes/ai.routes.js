import { Router } from "express";
import { generateNotes } from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post("/generate-notes", generateNotes);

export default aiRouter;
