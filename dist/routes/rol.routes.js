"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controllers_1 = __importDefault(require("../controllers/rol.controllers"));
const rol_validate_1 = __importDefault(require("../validators/rol.validate"));
const verifyJwt_helper_1 = require("../helpers/verifyJwt.helper");
const router = (0, express_1.Router)();
const rol = rol_controllers_1.default;
router.post("/", verifyJwt_helper_1.checkAuth, rol_validate_1.default, rol.createRol);
router.get("/", verifyJwt_helper_1.checkAuth, rol.getRoles);
router.get("/:id", verifyJwt_helper_1.checkAuth, rol.getById);
router.put("/:id", verifyJwt_helper_1.checkAuth, rol.updateRol);
router.delete("/:id", verifyJwt_helper_1.checkAuth, rol.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.routes.js.map