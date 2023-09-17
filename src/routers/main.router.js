import { Router } from "express";
import {
  createobject,
  readobject,
  readfile,
  updateobject,
  deleteobject,
  pagereadobject,
} from "../controllers/main.controller.js";
import { dataincorrect } from "../controllers/res.controller.js";
import { objectValidate } from "../validator/main.validator.js";
import { upload } from "../helpers/upload.file.js";
import { validate, isFilesValidate } from "../helpers/validator/index.js";
var router = new Router();

router.get("/dataincorrect", dataincorrect);

router.post(
  "/createobject",
  upload.fields([
    { name: "deskimg", maxCount: 1 },
    { name: "planshetyimg", maxCount: 2 },
    { name: "phoneimg", maxCount: 3 },
  ]),
  isFilesValidate,
  objectValidate,
  validate,

  createobject
);
router.get("/readobject/:_id", readobject);
router.get("/pagereadobject/:_item", pagereadobject);
router.get("/download/:filename", readfile);
router.put(
  "/updateobject/:_id",
  upload.fields([
    { name: "deskimg", maxCount: 1 },
    { name: "planshetyimg", maxCount: 2 },
    { name: "phoneimg", maxCount: 3 },
  ]),
  updateobject
);
router.delete("/deleteobject/:_id", deleteobject);

export default router;
