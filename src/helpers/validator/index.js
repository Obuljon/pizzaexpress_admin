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

function fileerrors(files) {
  let errorsArr = [];
  let filesname = ["deskimg", "planshetyimg", "phoneimg"];
  filesname.forEach((item) => {
    if (!files || !files[item]) {
      errorsArr.push({
        type: "file",
        msg: item + " must not be empty",
        path: item,
        location: "files",
      });
    }
  });
  return errorsArr;
}

function filedelete(filepath, name) {
  if (filepath[name]) {
    gfs.delete(filepath[name][0].id);
  }
}

export const isFilesValidate = (req, res, next) => {
  let errorsArr = fileerrors(req.files);
  if (
    !req.files ||
    !req.files.deskimg ||
    !req.files.planshetyimg ||
    !req.files.phoneimg
  ) {
    filedelete(req.files, "deskimg");
    filedelete(req.files, "planshetyimg");
    filedelete(req.files, "phoneimg");
    return res.status(400).json({ errors: errorsArr });
  } else next();
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
