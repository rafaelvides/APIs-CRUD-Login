import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResult from "../helpers/validate.helper";

const adminValidate = [
  check("rolId").exists().not().isEmpty(),
  check("Name").exists().not().isEmpty(),
  check("lastName").exists().not().isEmpty(),
  check("email").exists().not().isEmpty(),
  check("password").exists().not().isEmpty(),
  check("age")
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

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default adminValidate;
