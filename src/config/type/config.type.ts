export interface Configuration {
  readonly ENV: string;
  readonly PORT: number;
  readonly API_VERSION: string;
  readonly SENTRY_DSN: string;
  // DB
  readonly DB_INFO: {
    host: string;
    port: number;
    max: number;
    database: string;
    user: string;
    password: string;
  };
}
