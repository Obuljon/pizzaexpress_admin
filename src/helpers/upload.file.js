/**
 * Rename file extension and return file name
 * @param {Object} req - Express request object containing uploaded file
 * @returns {String} - Name of the uploaded file with the new extension
 * @throws {Error} - If the uploaded file does not have a valid image extension
 * @param paths paths to join.
 * @throws {TypeError} if any of the path segments is not a string.
 */

import path, { extname, join, dirname, normalize, resolve } from "path";
import { fileURLToPath } from "url";

import multer from "multer";

import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import { config } from "dotenv";
const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../../");
config({ path: __dirname + ".env" });
// Set storage
var storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "upload",
        };
        resolve(fileInfo);
      });
    });
  },
});

// upload
export const upload = multer({
  fileFilter: checkFileType,
  storage: storage,
});

// check file type
function checkFileType(req, file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}


