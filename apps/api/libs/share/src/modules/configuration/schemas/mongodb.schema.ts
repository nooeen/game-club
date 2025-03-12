import { HOST_SCHEMA } from "./common.schema";
import { MongoDBConfigType } from "../configs/mongodb.config";
import { CONFIG_DEFAULT, CONFIG_KEYS } from "@app/share/common/constants";
export function mongodbConfigSchema(
  required = false,
  configPrefix = CONFIG_KEYS.MONGODB,
  configKeys = null
) {
  let keys: { [x in keyof MongoDBConfigType]: string } = {
    uri: "URI",
  };

  if (configPrefix != "") {
    for (const key in keys) {
      keys[key] = `${configPrefix}_${keys[key]}`;
    }
  }

  if (configKeys != null) {
    keys = configKeys;
  }

  const schema = {};
  schema[`${configPrefix}_URI`] = HOST_SCHEMA.default(
    CONFIG_DEFAULT.MONGODB_URI
  );

  if (required) {
    for (const key in schema) {
      schema[key] = schema[key].required();
    }
  }

  return {
    ...schema,
  };
}
