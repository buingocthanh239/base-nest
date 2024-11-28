import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';
import { CheckHealthModule } from './modules/check-health/check-health.module';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from './middleware/request-id.middleware';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? ['.env.development'] : ['.env'],
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    CheckHealthModule,
    RedisCacheModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
