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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
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
