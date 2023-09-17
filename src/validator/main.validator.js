import {
  notEmpty,
  isString,
  isLength,
  isNumber,
  validate,
} from "../helpers/validator/index.js";

const notEmptyArr = ["name", "price"].map((item) => (item = notEmpty(item)));

const isNumberAndStringArr = [isString("name"), isNumber("price")];
export const objactValidate = [notEmptyArr, isNumberAndStringArr].flat();
