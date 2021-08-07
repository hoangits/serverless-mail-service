import joi from "joi";
import { PostMailTemplateViewReq } from "../view-models/postMailTemplateViewReq";

export class PostMailTemplateValidator {
  public static readonly SCHEMA = joi
    .object({
      from: joi.string().email().required(),
      to: joi.string().email().required(),
      templateName: joi.string().required(),
      data: joi.object().required(),
    })
    .optional();

  public static validate(request: PostMailTemplateViewReq) {
    const { error } = joi.validate(request, this.SCHEMA);
    if (error) {
      return error;
    }
    return true;
  }
}
