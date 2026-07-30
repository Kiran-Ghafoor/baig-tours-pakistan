import { Router } from "express";
import { createContact } from "../controllers/contact.controller";
import { validate } from "../middlewares/validate.middleware";
import { createContactSchema } from "../validators/contact.validator";

const router = Router();

router.post("/", validate(createContactSchema), createContact);

export default router;
