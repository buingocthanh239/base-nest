import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

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
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Be cautious about using synchronize in production
  }),
  inject: [ConfigService],
};
