export interface PostMailTemplateModelReq {
  readonly fromEmail: string;
  readonly toEmails: string[];
  readonly templateName: string;
  readonly data: object;
}
