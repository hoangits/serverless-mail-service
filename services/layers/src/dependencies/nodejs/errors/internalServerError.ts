import ErrorMessages from "common/errorMessages";
import { HttpBaseError } from "./httpBaseError";

export class InternalServerError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = ErrorMessages.SYSTEM_ERROR) {
    super(className, functionName, 500, "InternalServerError", message);
  }
}
