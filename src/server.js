import express from "express";
import { fileURLToPath } from "url";
import path, { join, dirname } from "path";
import { config } from "dotenv";
import { connect } from "mongoose";
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

const app = express();
config({ path: join(__dirname + ".env") });
const PORT = process.env.PORT || 9000;

app.set("port", PORT);

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(app.get("port"), () => {
  connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.log(err))
    .then(() => console.log("Dasabase connected"));
  console.info(`Server is running on PORT: ${app.get("port")}`);
});
