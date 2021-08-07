import ErrorMessages from "common/errorMessages";
import { HttpBaseError } from "./httpBaseError";

export class UnauthorizedError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = ErrorMessages.UNAUTHORIZED_ERROR) {
    super(className, functionName, 401, "UnauthorizedError", message);
  }
}
