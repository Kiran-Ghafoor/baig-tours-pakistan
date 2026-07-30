import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { getSeo, updateSeo } from "../../controllers/admin/seo.controller";

const router = Router();

router.use(authenticate);

router.get("/", getSeo);
router.put("/", updateSeo);

export default router;
