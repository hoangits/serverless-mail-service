import { SES } from "aws-sdk";
import { SendEmailResponse, SendTemplatedEmailResponse } from "aws-sdk/clients/ses";
import { PostMailModelReq } from "models/aws/postMailModelRequest";
import { PostMailTemplateModelReq } from "models/aws/postMailTemplateModelRequest";
import logger from "utils/logger";

export interface AwsDS {
  sendEmail(request: PostMailModelReq): Promise<SendEmailResponse>;
  sendTemplatedEmail(request: PostMailTemplateModelReq): Promise<SendTemplatedEmailResponse>;
}

export class AwsDSImpl implements AwsDS {
  private sesClient: SES;

  constructor() {
    const sesConfig = {
      region: process.env.REGION_AWS,
      apiVersion: "2010-12-01",
    };
    this.sesClient = new SES(sesConfig);
  }

  public async sendEmail(request: PostMailModelReq): Promise<SendEmailResponse> {
    const params = {
      Destination: {
        ToAddresses: request.toEmails,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: request.emailBody,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: request.subject,
        },
      },
      Source: request.fromEmail,
    };
    try {
      const result = await this.sesClient.sendEmail(params).promise();
      return result;
    } catch (error) {
      logger.error("Error - sendEmail:", error);
      throw error;
    }
  }

  public async sendTemplatedEmail(request: PostMailTemplateModelReq): Promise<SendTemplatedEmailResponse> {
    const params = {
      Source: request.fromEmail,
      Destination: {
        ToAddresses: request.toEmails,
      },
      Template: request.templateName,
      TemplateData: JSON.stringify(request.data),
    };
    try {
      const result = await this.sesClient.sendTemplatedEmail(params).promise();
      return result;
    } catch (error) {
      logger.error("Error - sendTemplatedEmail:", error);
      throw error;
    }
  }
}
