import ErrorMessages from "common/errorMessages";
import { HttpBaseError } from "./httpBaseError";

export class UnprocessableEntityError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string = ErrorMessages.NON_EXISTING_RESOURCE) {
    super(className, functionName, 422, "UnprocessableEntityError", message);
  }
}
