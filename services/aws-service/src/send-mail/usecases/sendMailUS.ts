import { SendEmailResponse } from "aws-sdk/clients/ses";
import { IllegalParameterError } from "errors/illegalParameterError";
import { PostMailModelReq } from "models/aws/postMailModelRequest";
import { PostMailTemplateModelReq } from "models/aws/postMailTemplateModelRequest";
import { AwsRepo } from "repositories/aws/awsRepo";
import { PostMailTemplateViewReq } from "send-mail/view-models/postMailTemplateViewReq";
import { PostMailViewReq } from "send-mail/view-models/postMailViewReq";
import { PostMailTemplateValidator } from "../validators/postMailTemplateValidator";
import { PostMailValidator } from "../validators/postMailValidator";

export interface SendMailUS {
  execute(request: PostMailViewReq | PostMailTemplateViewReq): Promise<SendEmailResponse>;
}

export class SendMailUSImpl implements SendMailUS {
  constructor(private readonly awsRepo: AwsRepo) { }

  public async execute(request: PostMailViewReq | PostMailTemplateViewReq): Promise<SendEmailResponse> {
    console.log("request:", request);
    try {
      let result;
      if (request.type === "TEMPLATE") {
        const templateReq = request as PostMailTemplateViewReq;
        result = await this.processSendMailTemplate(templateReq);
      } else {
        const mailReq = request as PostMailViewReq;
        result = await this.processSendMailNormal(mailReq);
      }
      return result;
    } catch (error) {
      // logger.error("SendMailUSImpl:", error);
      console.log("error:", error);
      throw new IllegalParameterError("SendMailUSImpl", "execute", error.message);
    }
  }

  private async checkValidateNormal(request: PostMailViewReq): Promise<boolean> {
    const validate = PostMailValidator.validate(request);
    if (validate !== true) {
      throw new Error(`Invalid provided values: ${validate.message}`);
    }
    return true;
  }

  private async checkValidateTemplate(request: PostMailTemplateViewReq): Promise<boolean> {
    const validate = PostMailTemplateValidator.validate(request);
    if (validate !== true) {
      throw new Error(`Invalid provided values: ${validate.message}`);
    }
    return true;
  }

  private async processSendMailNormal(request: PostMailViewReq): Promise<any> {
    await this.checkValidateNormal(request);
    try {
      const toEmails = request.to.split(",");
      const getRequest: PostMailModelReq = {
        toEmails,
        fromEmail: request.from,
        subject: request.subject,
        emailBody: request.body,
      };
      const result = await this.awsRepo.sendEmail(getRequest);
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async processSendMailTemplate(request: PostMailTemplateViewReq): Promise<any> {
    await this.checkValidateTemplate(request);
    try {
      const toEmails = request.to.split(",");
      const getRequest: PostMailTemplateModelReq = {
        toEmails,
        fromEmail: request.from,
        templateName: request.templateName,
        data: request.data,
      };
      const result = await this.awsRepo.sendTemplatedEmail(getRequest);
      return result;
    } catch (error) {
      throw error;
    }
  }

}
