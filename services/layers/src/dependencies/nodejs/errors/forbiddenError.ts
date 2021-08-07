import ErrorMessages from "common/errorMessages";
import { HttpBaseError } from "./httpBaseError";

export class ForbiddenError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = ErrorMessages.FORBIDDEN_ERROR) {
    super(className, functionName, 403, "ForbiddenError", message);
  }
}
