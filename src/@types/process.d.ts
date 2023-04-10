declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly PORT: number;
      readonly JWT_SECRET: string;

      /** Email communication setup: email */
      readonly EMAIL: string;
      /** Email communication setup: password */
      readonly PASSWORD: string;

      /** Database Hostname */
      readonly DB_HOST: string;
      /** Database Port */
      readonly DB_PORT: string;
      /** Database Username */
      readonly DB_USER: string;
      /** Database Password */
      readonly DB_PWD: string;
      /** Database name */
      readonly DB_NAME: string;
    }
  }
}

export {};
