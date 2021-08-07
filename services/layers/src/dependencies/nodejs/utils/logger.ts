/* tslint:disable:import-name */
import PinoConstructor from "pino";

const nodeEnv = process.env.NODE_ENV;

export interface Logger {
  debug(message: string, additionalData?: object): void;
  info(message: string, additionalData?: object): void;
  warn(message: string, additionalData?: object): void;
  error(message: string, additionalData?: object): void;
  fatal(message: string, additionalData?: object): void;
}

export class PinoLoggerImpl implements Logger {
  private readonly logger: PinoConstructor.Logger;

  constructor() {
    this.logger = PinoConstructor({
      level: nodeEnv === "test" ? "silent" : "info",
    });
  }

  public debug(message: string, additionalData?: object): void {
    this.logger.debug({ additionalData }, message);
  }

  public info(message: string, additionalData?: object): void {
    this.logger.info({ additionalData }, message);
  }

  public warn(message: string, additionalData?: object): void {
    this.logger.warn({ additionalData }, message);
  }

  public error(message: string, additionalData?: object): void {
    this.logger.error({ additionalData }, message);
  }

  public fatal(message: string, additionalData?: object): void {
    this.logger.fatal({ additionalData }, message);
  }
}

export default new PinoLoggerImpl();
