import {
  IsOptionalisNum,
  IsOptionalisStr,
} from "../helpers/validator/index.js";

export const updataValidateArr = [
  IsOptionalisNum("price"),
  IsOptionalisStr("name"),
];
