import { Router } from "express";
import {
  createobjact,
  readobjact,
  readfile,
  updateobjact,
  deleteobjact,
} from "../controllers/main.controller.js";
import { dataincorrect } from "../controllers/res.controller.js";
import { objactValidate } from "../validator/main.validator.js";
import { upload } from "../helpers/upload.file.js";
import { validate, isFilesValidate } from "../helpers/validator/index.js";
var router = new Router();

router.get("/dataincorrect", dataincorrect);

router.post(
  "/createobjact",
  upload.fields([
    { name: "deskimg", maxCount: 1 },
    { name: "planshetyimg", maxCount: 2 },
    { name: "phoneimg", maxCount: 3 },
  ]),
  isFilesValidate,
  objactValidate,
  validate,

  createobjact
);
router.get("/readobjact/:_id", readobjact);
router.get("/download/:filename", readfile);
router.put(
  "/updateobjact/:_id",
  upload.fields([
    { name: "deskimg", maxCount: 1 },
    { name: "planshetyimg", maxCount: 2 },
    { name: "phoneimg", maxCount: 3 },
  ]),
  updateobjact
);
router.delete("/deleteobjact/:_id", deleteobjact);

export default router;
