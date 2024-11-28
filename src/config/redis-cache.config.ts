import { CacheModuleAsyncOptions, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { EnvironmentVariables, IRedisConfig } from './configuration';

export const redisOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
    const redisConfig = configService.get<IRedisConfig>('redis');
    const store = await redisStore({
      socket: {
        host: redisConfig.host,
        port: redisConfig.port,
      },
    });
    return {
      store: store as unknown as CacheStore,
    };
  },
  inject: [ConfigService],
};
