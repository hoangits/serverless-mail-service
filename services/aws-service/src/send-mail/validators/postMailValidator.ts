import joi from "joi";
import { PostMailViewReq } from "../view-models/postMailViewReq";

export class PostMailValidator {
  public static readonly SCHEMA = joi
    .object({
      from: joi.string().email().required(),
      to: joi.string().email().required(),
      subject: joi.string().required(),
      body: joi.string().required(),
    })
    .optional();

  public static validate(request: PostMailViewReq) {
    const { error } = joi.validate(request, this.SCHEMA);
    if (error) {
      return error;
    }
    return true;
  }
}
