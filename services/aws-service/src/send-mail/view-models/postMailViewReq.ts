export interface PostMailViewReq {
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly body: string;
  readonly type: string;
}
