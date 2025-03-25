declare namespace NodeJS {
  interface ProcessEnv {
    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
    MAIL_TRANSPORT: string;

    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
    FACEBOOK_APP_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URL: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;

    S3_REGION: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
    S3_IMAGE_BUCKET: string;
    S3_UTILS_BUCKET: string;

    MINIO_ENDPOINT: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    MINIO_IMAGE_BUCKET: string;
    MINIO_UTILS_BUCKET: string;
    MINIO_PORT: string;

    // PROD GENERAL CONFIG
    PROD_TYPE: string;
    PROD_HOST: string;
    PROD_PORT: string;
    PROD_USERNAME: string;
    PROD_PASSWORD: string;

    // PROD CORE DB CONFIG
    PROD_DATABASE_CORE: string;

    // PROD TEST DB CONFIG
    PROD_DATABASE_TEST: string;
    PROD_NAME_TEST: string;

    //  PROD LIVE DB CONFIG
    PROD_DATABASE_LIVE: string;
    PROD_NAME_LIVE: string;

    // PROD STOCK ANALYSIS DB CONFIG
    PROD_DATABASE_STOCK_ANALYSIS_DB: string;
    PROD_NAME_STOCK_ANALYSIS_DB: string;

    // # PROD WORLD_ECONOMY DB CONFIG
    PROD_DATABASE_WORLD_ECONOMY: STRING;
    PROD_NAME_WORLD_ECONOMY: String;

    // PROD BROKER DB CONFIG
    PROD_DATABASE_BROKER: string;
    PROD_NAME_BROKER: string;

    // COMBINED DB ACCESS URL
    DATABASE_URL_CORE: string;
    DATABASE_URL_TEST: string;
    DATABASE_URL_LIVE: string;
    DATABASE_URL_STOCK_ANALYSIS_DB: string;
    DATABASE_URL_WORLD_ECONOMY: string;
    DATABASE_URL_BROKER: string;

    // WEBSITE ENDPOINTS
    FRONTEND_URL_DEV: string;
    FRONTEND_URL_PROD: string;
    FRONTEND_URL_NEWS: string;
    BACKEND_URL_DEV: string;
    BACKEND_URL_PROD: string;
    ALLOW_CORS_ORIGIN: string;

    // NODEJS CONFIG
    NODE_ENV: string;
    PORT: string;

    SWAGGER_USER: string;
    SWAGGER_PASSWORD: string;

    DEV_REDIS_HOST: string;
    DEV_REDIS_PORT: string;

    PROD_REDIS_HOST: string;
    PROD_REDIS_PORT: string;
    PROD_REDIS_PASSWORD: string;

    QUEUE_HOST: string;
    QUEUE_PORT: number;

    CACHE_TTL: number;
    MAX_KEY: string;
    STORE: string;

    ESEWA_SECRET_KEY: string;
    ESEWA_PRODUCT_CODE: string;
    ESEWA_SIGNED_FIELD_NAMES: string;

    KHALTI_INITIATE_URL: srting;
    KHALTI_SECRET_KEY: string;

    CONNECTIPS_MERCHANTID: string;
    CONNECTIPS_APPID: string;
    CONNECTIPS_APPNAME: string;
    CONNECTIPS_TXNCRNCY: string;
    CONNECTIPS_PASS_PRASE_CREDITOR: string;
    CONNECTIPS_KEY_PATH: string;
    CONNECTIPS_REFERENCEID: string;
    CONNECTIPS_REMARKS: string;
    CONNECTIPS_PARTICULARS: string;
    CONNECTIPS_LOGINPAGE: string;
    CONNECTIPS_VALIDATETXN: string;
    CONNECTIPS_VALIDATION_PASSWORD: string;
    CONNECTIPS_PRIVATE_KEY: string;

    THROTTLE_TTL: number;
    THROTTLE_LIMIT: number;

    MAX_PARALLEL_DEVICE: string;
  }
}
