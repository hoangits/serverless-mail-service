export interface PostMailTemplateViewReq {
  readonly from: string;
  readonly to: string;
  readonly templateName: string;
  readonly data: object;
  readonly type: string;
}
