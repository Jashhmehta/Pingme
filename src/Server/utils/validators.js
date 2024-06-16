import { body, validationResult, check, param } from "express-validator";
import { ErrorHandler } from "./utility.js";

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  check("avatar", "Please uxpload avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 50 })
    .withMessage("Members must be between 2-50"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 50 })
    .withMessage("Members must be between 1-50"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("userId", "Please Enter userId").notEmpty(),
];

const leaveGroupValidator = () => [
  param("id", "Please enter chat id").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please enter chat Id").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please upload attachments")
    .isArray({ min: 1, max: 10 })
    .withMessage("Attachments must be between 1-10"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};
export {
  registerValidator,
  validate,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentsValidator,
};
