export interface Configuration {
  readonly ENV: string;
  readonly PORT: number;
  readonly API_VERSION: string;

  // DB
  readonly DB_INFO: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
