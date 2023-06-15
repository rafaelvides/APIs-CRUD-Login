"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = __importDefault(require("../controllers/admin.controllers"));
const admin_validate_1 = __importDefault(require("../validators/admin.validate"));
const verifyJwt_helper_1 = require("../helpers/verifyJwt.helper");
const router = (0, express_1.Router)();
const admin = admin_controllers_1.default;
router.post("/", admin_validate_1.default, admin.createAdmin);
router.get("/", verifyJwt_helper_1.checkAuth, admin.getAdmins);
router.get("/:id", verifyJwt_helper_1.checkAuth, admin.getById);
router.put("/:id", verifyJwt_helper_1.checkAuth, admin.updateAdmin);
router.delete("/:id", verifyJwt_helper_1.checkAuth, admin.deleteAdmin);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map