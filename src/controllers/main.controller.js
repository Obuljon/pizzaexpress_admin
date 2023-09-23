import { asyncHandler } from "../helpers/asyncHandler.js";
import object from "../models/object.model.js";
import { gfs } from "../middleware/dbconnect.js";
import sharp from "sharp";
import { readFile, appendFile } from "fs";
import { SUCCESS_MESSAGES } from "../helpers/enums/success-messages.js";
import { ERROR_MESSAGES } from "../helpers/enums/error-messages.js";
import { ObjectId } from "mongoose";

export const createobject = asyncHandler(async (req, res) => {
  req.body.img = req.file.filename;
  const { name, price, img } = req.body;

  let data = await object
    .create({
      name,
      price,
      img,
    })
    .catch((err) => null);
  res.status(201).json({ data, message: SUCCESS_MESSAGES.SUCCESS_FULLY });
});

export const readobject = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await object.findById(_id).catch((err) => null);
  if (data === null) return res.redirect("/api/dataincorrect");
  res.status(200).json(data);
});

export const readobjects = asyncHandler(async (req, res) => {
  let _item = req.params._item;
  Number(_item);
  const pageSize = 6;
  _item -= 1;
  if (isNaN(_item)) {
    _item = 0;
  }
  const skip = _item * pageSize;
  const totalCount = await object.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const data = await object.find().skip(skip).limit(pageSize);
  const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);
  res.json({ data, pagenetion });
});

export const readfile = asyncHandler(async (req, res) => {
  const { filename, width, height } = req.params;
  let numwidth = Number(width);
  if (isNaN(numwidth)) numwidth = 10;
  let numheight = Number(height);
  if (isNaN(numheight)) numheight = 10;
  const data = await gfs.find({ filename: filename }).toArray();
  if (data.length === 0) return res.redirect("/api/dataincorrect");
  const stream = gfs.openDownloadStreamByName(filename);
  const transformer = sharp().resize(numwidth, numheight);
  stream.pipe(transformer).pipe(res);
});

export const pagereadobject = asyncHandler(async (req, res) => {
  let _item = req.params._item;
  Number(_item);
  const pageSize = 6;
  _item -= 1;
  if (isNaN(_item)) {
    _item = 0;
  }
  const skip = _item * pageSize;
  const totalCount = await object.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const menu = await object.find().skip(skip).limit(pageSize);
  const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);
  res.json({ data: menu, pagenetion });
});

export const updateobject = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const olddata = await object.findById(_id).catch((err) => null);
  if (olddata === null) {
    if (req.file) gfs.delete(req.file.id);
    return res.redirect("/api/dataincorrect");
  } else {
    if (req.file) {
      const oldfile = await gfs.find({ filename: olddata.img }).toArray();
      req.body.img = req.file.filename;
    }
    const { name, price, img } = req.body;
    const newdata = await object
      .findByIdAndUpdate(_id, { $set: { name, price, img } })
      .catch((err) => null);
    if (newdata)
      res.status(201).json({ message: SUCCESS_MESSAGES.SUCCESS_FULLY });
    else return res.redirect("/api/dataincorrect");
  }
});

export const deleteobject = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const delObj = await object.findById(_id).catch((err) => null);
  if (delObj === null) return res.redirect("/api/dataincorrect");
  const filename = delObj.img;
  const delfile = await gfs.find({ filename: filename }).toArray();
  if (delfile) {
    gfs.delete(delfile[0]._id);
  }
  const deleteobj = await object.findByIdAndDelete(_id).catch((err) => null);
  if (deleteobj == null)
    return res
      .status(400)
      .send({ error: "Error occurred while deleting record" });
  res.status(201).json({ message: "data delete" });
});
