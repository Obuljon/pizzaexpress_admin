import { Schema, model } from "mongoose";

const object = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

export default model("object", object);
