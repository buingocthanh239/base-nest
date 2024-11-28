import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvironmentVariables, IPostgresConfig } from './configuration';

export const typeORMConfig: TypeOrmModuleOptions = {
  parseInt8: true,
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.POSTGRES_SYNC === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true',
  entities: [],
};

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService<EnvironmentVariables>) => {
    const postgresConfig = configService.get<IPostgresConfig>('postgres');
    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      synchronize: postgresConfig.synchronize, // Be cautious about using synchronize in production
      logging: postgresConfig.logging,
      entities: [],
    };
  },
  inject: [ConfigService],
};
