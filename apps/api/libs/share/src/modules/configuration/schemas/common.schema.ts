import * as Joi from "joi";

export const ENV_SCHEMA = Joi.string()
  .valid("development", "production", "test", "provision", "staging")
  .default("development")
  .required();

export const HOST_SCHEMA = Joi.string();
export const PORT_SCHEMA = Joi.number();
export const URI_SCHEMA = Joi.string();
