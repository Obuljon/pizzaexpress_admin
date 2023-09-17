import { Schema, model } from "mongoose";

const objact = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  deskimg: { type: String, required: true },
  planshetyimg: { type: String, required: true },
  phoneimg: { type: String, required: true },
});

export default model("objact", objact);
