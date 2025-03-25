import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async clearCacheWithPrefix(prefix: string): Promise<void> {
    try {
      // const keys = await this.cacheManager.store.keys(`/${prefix}*`);
      // console.log(keys, 'keys to be deleted ....');
      // if (keys.length >= 1) {
      //   keys.map(async (key) => {
      //     await this.cacheManager.store.del(key);
      //   });
      // }
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }
}
