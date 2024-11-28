export interface IPostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  runMigrations: boolean;
}

export enum EMode {
  dev = 'DEV',
  prod = 'PROD',
}

export interface IRedisConfig {
  host: string;
  port: number;
}

export interface IS3Config {
  accessKey: string;
  secretKey: string;
  region: string;
  bucketName: string;
}

export interface EnvironmentVariables {
  port: number;
  mode: EMode;
  postgres: IPostgresConfig;
  redis: IRedisConfig;
  jwtSecret: string;
  jwtTokenExpiration: number;
  jwtRefreshExpiration: number;
  jwtRefreshSecret: string;
  s3: IS3Config;
}
export default () => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!jwtSecret) {
    throw new Error('Jwt secret is not set in env');
  }

  if (!jwtRefreshSecret) {
    throw new Error('Jwt refresh secret is not set in env');
  }
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    mode: process.env.MODE,
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: process.env.POSTGRES_SYNC === 'true',
      logging: process.env.POSTGRES_LOGGING === 'true',
      runMigrations: process.env.RUN_MIGRATIONS === 'true',
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    jwtSecret,
    jwtRefreshSecret,
    jwtTokenExpiration: parseInt(process.env.JWT_TOKEN_EXPIRY, 10),
    jwtRefreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRY, 10),
    s3: {
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
      bucketName: process.env.S3_BUCKET_NAME,
    },
  };
};
