import { Router } from "express";
import AdminController from "../controllers/admin.controllers";
import adminValidate from "../validators/admin.validate";
import { checkAuth } from "../helpers/verifyJwt.helper";

const router = Router();
const admin = AdminController;

router.post("/", adminValidate, admin.createAdmin);
router.get("/", checkAuth, admin.getAdmins);
router.get("/:id", checkAuth,admin.getById);
router.put("/:id", checkAuth,admin.updateAdmin);
router.delete("/:id", checkAuth,admin.deleteAdmin);

export default router;
