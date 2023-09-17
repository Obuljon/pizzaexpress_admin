import { ERROR_MESSAGES } from "../helpers/enums/error-messages.js";

export const dataincorrect = (req, res) => {
  res.status(400).json({ message: ERROR_MESSAGES.NOT_FOUND });
};
