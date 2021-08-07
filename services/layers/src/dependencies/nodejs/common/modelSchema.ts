export default class ModelSchema {
  public static readonly SCHEMA_ID = {
    type: "string",
    format: "uuid",
    errorMessage: "should be an UUID",
  };
}
