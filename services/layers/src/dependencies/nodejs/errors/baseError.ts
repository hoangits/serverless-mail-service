import HttpStatusCode from "common/httpStatusCode";

export default class BaseError extends Error {
  public readonly errorCode: number;

  constructor(message: string, errorCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR) {
    // Call parent constructor
    super(message);

    // Saving class name in the property of our custom error as a shortcut
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Custom properties
    this.errorCode = errorCode;
  }
}
