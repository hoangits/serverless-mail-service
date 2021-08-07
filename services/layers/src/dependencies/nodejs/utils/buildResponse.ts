import HttpStatusCode from "common/httpStatusCode";

export default function buildResponse(
  data: any,
  message: string,
  errorDescription: string[] = null,
  statusCode: HttpStatusCode = HttpStatusCode.OK,
) {
  const body = JSON.stringify({ message, errorDescription, data });
  return { statusCode, body };
}

export interface ListDataResponse {
  readonly draw: number;
  readonly recordsTotal: number;
  readonly recordsFiltered: number;
  readonly data: any[];
}
