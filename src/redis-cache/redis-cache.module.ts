import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisOptions } from 'src/config/redis-cache.config';

@Module({
  imports: [CacheModule.registerAsync(redisOptions)],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
