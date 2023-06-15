"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const adminValidate = [
    (0, express_validator_1.check)("rolId").exists().not().isEmpty(),
    (0, express_validator_1.check)("Name").exists().not().isEmpty(),
    (0, express_validator_1.check)("lastName").exists().not().isEmpty(),
    (0, express_validator_1.check)("email").exists().not().isEmpty(),
    (0, express_validator_1.check)("password").exists().not().isEmpty(),
    (0, express_validator_1.check)("age")
        .exists()
        .custom((value, { req }) => {
        if (value < 18 || value > 50) {
            throw new Error("La edad no puede ser menos a 18 años");
        }
        return true;
    })
        .isNumeric()
        .not()
        .isEmpty(),
    (req, res, next) => {
        (0, validate_helper_1.default)(req, res, next);
    },
];
exports.default = adminValidate;
//# sourceMappingURL=admin.validate.js.map