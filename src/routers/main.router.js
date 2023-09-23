import { Router } from "express";
import multer from "multer";
import { storage, checkFileType } from "../helpers/upload.file.js";
import {
  createobject,
  readobject,
  readfile,
  updateobject,
  deleteobject,
  pagereadobject,
  readobjects,
} from "../controllers/main.controller.js";
import { dataincorrect } from "../controllers/res.controller.js";
import { objectValidate } from "../validator/main.validator.js";
import { updataValidateArr } from "../validator/update.validator.js";
import { upload } from "../helpers/upload.file.js";
import { validate, isFilesValidate } from "../helpers/validator/index.js";
var router = new Router();

router.get("/dataincorrect", dataincorrect);

router.post(
  "/createobject",
  upload.single("img"),
  isFilesValidate,
  objectValidate,
  validate,

  createobject
);
router.get("/readobjects/:_item", readobjects);
router.get("/readobject/:_id", readobject);
router.get("/pagereadobject/:_item", pagereadobject);
router.get("/download/:width/:height/:filename", readfile);
router.put(
  "/updateobject/:_id",
  multer({ storage }).single("img"),
  updataValidateArr,
  validate,
  updateobject
);
router.delete("/deleteobject/:_id", deleteobject);

export default router;
