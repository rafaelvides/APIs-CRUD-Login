import { Router } from "express";
import RolController from "../controllers/rol.controllers";
import rolValidate from "../validators/rol.validate";
import { checkAuth } from "../helpers/verifyJwt.helper";

const router = Router();
const rol = RolController;

router.post("/", checkAuth,rolValidate, rol.createRol);
router.get("/", checkAuth, rol.getRoles);
router.get("/:id", checkAuth,rol.getById);
router.put("/:id", checkAuth,rol.updateRol);
router.delete("/:id", checkAuth,rol.deleteRol);

export default router;
