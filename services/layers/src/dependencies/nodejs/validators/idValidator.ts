import joi from "joi";
import { IdViewReq } from "view-models/idViewReq";
export class IdValidator {
  public static readonly SCHEMA = joi
    .object({
      id: joi.number().min(1).required(),
    })
    .required();

  public static validate(request: IdViewReq) {
    const { error } = joi.validate(request, IdValidator.SCHEMA);
    if (error) {
      return error;
    }
    return true;
  }
}
