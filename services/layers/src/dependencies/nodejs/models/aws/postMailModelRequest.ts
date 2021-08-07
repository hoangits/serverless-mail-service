export interface PostMailModelReq {
  readonly fromEmail: string;
  readonly toEmails: string[];
  readonly subject: string;
  readonly emailBody: string;
}
