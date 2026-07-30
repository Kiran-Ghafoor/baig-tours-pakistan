import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { search } from "../../controllers/admin/search.controller";

const router = Router();

router.use(authenticate);

router.get("/", search);

export default router;
