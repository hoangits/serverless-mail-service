import ErrorMessages from "common/errorMessages";
import HttpStatusCode from "common/httpStatusCode";
import { HttpBaseError } from "errors/httpBaseError";
import { UnprocessableEntityError } from "errors/unprocessableEntityError";
import lambdaWarmer from "lambda-warmer";
import logger from "utils/logger";

export const requestHandler = (handler: (request: any) => any) => {
  return async (event: any) => {
    logger.info("event:", event);
    try {
      if (await lambdaWarmer(event)) return "warmed";
      const res = await handler(event);
      res.headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      logger.info("requestHandler-res:", res);
      return res;
    } catch (error) {
      logger.error("ErrStack:", error.stack);

      let res;

      if (error instanceof UnprocessableEntityError) {
        res = {
          statusCode: error.code,
          body: JSON.stringify({
            message: error.message,
            errors: error.reason,
          }),
        };
      }

      if (error instanceof HttpBaseError) {
        res = {
          statusCode: error.code,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }

      res = res ? res : {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
          message: ErrorMessages.INTERAL_SERVER_ERROR,
        }),
      };

      return res;
    }
  };
};
