import { body, validationResult } from "express-validator";
import { gfs } from "../../middleware/dbconnect.js";
export function notEmpty(inputname) {
  return body(inputname)
    .notEmpty()
    .withMessage(inputname + " must not be empty");
}
export function isString(inputname) {
  return body(inputname)
    .isString()
    .withMessage(inputname + " must be a string");
}

export function isLength(inputname, min) {
  return body(inputname)
    .isLength({ min: min })
    .withMessage(inputname + ` must be min:${min} character`);
}

export function isNumber(inputname) {
  return body(inputname)
    .isNumeric()
    .withMessage(inputname + " must be a number");
}

export function IsOptionalisStr(inputname) {
  return body(inputname)
    .optional()
    .isString()
    .withMessage(inputname + " must be a string");
}

export function IsOptionalisNum(inputname) {
  return body(inputname)
    .optional()
    .isNumeric()
    .withMessage(inputname + " must be a number");
}

export function filedelete(filepath, name) {
  if (filepath[name]) {
    gfs.delete(filepath[name][0].id);
  }
}

export const isFilesValidate = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      errors: [
        {
          type: "file",
          msg: "img must not be empty",
          path: "img",
          location: "file",
        },
      ],
    });
  } else next();
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) gfs.delete(req.file.id);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
