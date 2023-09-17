import mongoose, { connect, createConnection } from "mongoose";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../../");

config({ path: join(__dirname, ".env") });
const url = process.env.MONGODB_URI;
export const db = connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.log(err))
  .then(() => console.log("Dasabase connected"));

export const conn = createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export var gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "upload" });
});
