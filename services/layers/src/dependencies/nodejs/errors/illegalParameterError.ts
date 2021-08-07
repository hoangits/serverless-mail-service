import { HttpBaseError } from "./httpBaseError";

export class IllegalParameterError extends HttpBaseError {
  constructor(className: string, functionName: string, message: string, code?: number) {
    super(className, functionName, code || 400, "IllegalParameterError", message);
  }
}
