import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResult from "../helpers/validate.helper";

const rolValidate = [
  check("type").exists().not().isEmpty(),check("description").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export default rolValidate;
