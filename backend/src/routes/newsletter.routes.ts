import { Router } from "express";
import { subscribe } from "../controllers/newsletter.controller";
import { validate } from "../middlewares/validate.middleware";
import { subscribeSchema } from "../validators/newsletter.validator";

const router = Router();

router.post("/", validate(subscribeSchema), subscribe);

export default router;
