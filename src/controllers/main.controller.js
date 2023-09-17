import { asyncHandler } from "../helpers/asyncHandler.js";
import objact from "../models/objact.model.js";
import { gfs } from "../middleware/dbconnect.js";
import { SUCCESS_MESSAGES } from "../helpers/enums/success-messages.js";
import { ERROR_MESSAGES } from "../helpers/enums/error-messages.js";
import { ObjectId } from "mongoose";

export const createobjact = asyncHandler(async (req, res) => {
  req.body.deskimg = req.files.deskimg[0].filename;
  req.body.planshetyimg = req.files.planshetyimg[0].filename;
  req.body.phoneimg = req.files.phoneimg[0].filename;
  const { name, price, deskimg, planshetyimg, phoneimg } = req.body;

  let data = await objact.create({
    name,
    price,
    deskimg,
    planshetyimg,
    phoneimg,
  });
  res.status(201).json({ data, message: SUCCESS_MESSAGES.SUCCESS_FULLY });
});

export const readobjact = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await objact.findById(_id);
  if (!data) {
    return res.redirect("/api/dataincorrect");
  }
  res.status(200).json(data);
});

export const readfile = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const data = await gfs.find({ filename: filename }).toArray();
  if (data.length === 0) return res.redirect("/api/dataincorrect");
  const stream = gfs.openDownloadStreamByName(filename);
  stream.pipe(res);
  stream.on("end", () => res.end());
  stream.on("error", (err) => {
    console.error(err);
    res.status(500).end("SERVER_ERROR");
  });
});

export const updateobjact = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const olddata = await objact.findById(_id);
  if (!olddata) {
    return res.redirect("/api/dataincorrect");
  }
  let newfiles = {};
  for (let key in req.files) {
    const oldfile = await gfs.find({ filename: olddata[key] }).toArray();
    gfs.delete(oldfile[0]._id);
    newfiles[key] = req.files[key][0].filename;
  }
  const { name, price } = req.body;
  await objact.updateOne({ _id }, { $set: { name, price, ...newfiles } });
  res.status(201).json({ message: SUCCESS_MESSAGES.SUCCESS_FULLY });
});

export const deleteobjact = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const delObj = await objact.findById(_id);
  if (!delObj) {
    return res.redirect("/api/dataincorrect");
  }
  const { deskimg, planshetyimg, phoneimg } = delObj;
  const delfiles = { deskimg, planshetyimg, phoneimg };
  for (let key in delfiles) {
    const delfile = await gfs.find({ filename: delfiles[key] }).toArray();
    if (delfile) {
      gfs.delete(delfile[0]._id);
    }
  }
  await objact.findByIdAndDelete(_id);
  res.status(201).json({ message: "data delete" });
});
