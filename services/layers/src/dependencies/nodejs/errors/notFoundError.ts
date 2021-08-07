import ErrorMessages from "common/errorMessages";
import { HttpBaseError } from "./httpBaseError";

export class NotFoundError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = ErrorMessages.RESOURCE_NOT_FOUND_ERROR) {
    super(className, functionName, 404, "NotFoundError", message);
  }
}
