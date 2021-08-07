const {
  DB_REGION,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  COGNITO_CONFIGFILE,
  COGNITO_USER_POOL_ID,
  REGION_AWS,
  COGNITO_CLIENTID,
  NODE_ENV,
  S3_BUCKET,
} = process.env;

export class ENVConfig {
  public static readonly NODE_ENV = NODE_ENV;

  public static readonly DB_HOST = DB_HOST;
  public static readonly DB_REGION = DB_REGION;
  public static readonly DB_PORT = Number(DB_PORT);
  public static readonly DB_USER = DB_USER;
  public static readonly DB_PASS = DB_PASS;
  public static readonly DB_NAME = DB_NAME;
  public static readonly S3_BUCKET = S3_BUCKET;

  public static readonly COGNITO_CONFIGFILE = COGNITO_CONFIGFILE;
  public static readonly COGNITO_USERPOOLID = COGNITO_USER_POOL_ID;
  public static readonly COGNITO_REGION = REGION_AWS;
  public static readonly COGNITO_CLIENTID = COGNITO_CLIENTID;
}
