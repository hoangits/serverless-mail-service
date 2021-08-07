import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import HttpStatusCode from "common/httpStatusCode";
import { AwsDSImpl } from "data-sources/aws/awsDS";
import { cors, httpErrorHandler, jsonBodyParser, urlEncodeBodyParser } from "middy/middlewares";
import { AwsRepoImpl } from "repositories/aws/awsRepo";
import buildResponse from "utils/buildResponse";
import { requestHandler } from "utils/handlers";
import { SendMailUS, SendMailUSImpl } from "./usecases/sendMailUS";
import { PostMailTemplateViewReq } from "./view-models/postMailTemplateViewReq";
import { PostMailViewReq } from "./view-models/postMailViewReq";

let sendMailUS: SendMailUS;

const sendMail = async (event: any) => {
  if (!sendMailUS) {
    sendMailUS = await initSendMailUS();
  }
  // Check IP
  const sourceIp = event.requestContext.identity.sourceIp;
  if (sourceIp !== process.env.HOST_ALLOW) {
    return buildResponse(null, "Access denied resource", null, HttpStatusCode.FORBIDDEN);
  }

  const request = event.body as PostMailViewReq | PostMailTemplateViewReq;
  const response = await sendMailUS.execute(request);
  return buildResponse(response, "OK");
};

async function initSendMailUS(): Promise<any> {
  const awsDb = new AwsDSImpl();
  const awsRepo = new AwsRepoImpl(awsDb);
  return new SendMailUSImpl(awsRepo);
}

exports.handler = middy(requestHandler(sendMail))
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser())
  .use(httpErrorHandler())
  .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
  .use(cors());
