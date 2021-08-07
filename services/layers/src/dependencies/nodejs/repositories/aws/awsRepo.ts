import { SendEmailResponse, SendTemplatedEmailResponse } from "aws-sdk/clients/ses";
import { AwsDS } from "data-sources/aws/awsDS";
import { PostMailModelReq } from "models/aws/postMailModelRequest";
import { PostMailTemplateModelReq } from "models/aws/postMailTemplateModelRequest";

export interface AwsRepo {
  sendEmail(request: PostMailModelReq): Promise<SendEmailResponse>;
  sendTemplatedEmail(request: PostMailTemplateModelReq): Promise<SendTemplatedEmailResponse>;
}

export class AwsRepoImpl implements AwsRepo {
  constructor(private readonly awsDS: AwsDS) { }

  public async sendEmail(request: PostMailModelReq): Promise<SendEmailResponse> {
    return this.awsDS.sendEmail(request);
  }

  public async sendTemplatedEmail(request: PostMailTemplateModelReq): Promise<SendTemplatedEmailResponse> {
    return this.awsDS.sendTemplatedEmail(request);
  }
}
