import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { listContacts, getContact, updateContact, deleteContact } from "../../controllers/admin/contact.controller";

const router = Router();

router.use(authenticate);

router.get("/", listContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
