// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { RedisClientType, createClient } from 'redis';

// @Injectable()
// export class RedisClientService implements OnModuleInit, OnModuleDestroy {
//   private client: RedisClientType;

//   async onModuleInit() {
//     this.client =
//       process.env.NODE_ENV == 'production'
//         ? createClient({
//             url: `redis://${process.env.PROD_REDIS_HOST}:${process.env.PROD_REDIS_PORT}`,
//             password: process.env.PROD_REDIS_PASSWORD,
//           })
//         : createClient({
//             url: `redis://${process.env.DEV_REDIS_HOST}:${process.env.DEV_REDIS_PORT}`,
//           });

//     await this.client.connect();
//     console.log('Redis client connected');

//     /**
//        * @Example
//       // push element at the end of list
//       await this.cacheManagerService
//         .getClient()
//         .rPush(`user:session:${savedUser.id}`, session_id);

//       // only keep latest 3 element
//       //   await this.cacheManagerService
//       //     .getClient()
//       //     .lTrim('user:session:2', -3, -1);

//       // pop from start
//       // await this.cacheManagerService.getClient().lPop('user:session:2');

//       // pop from end
//       // await this.cacheManagerService.getClient().rPop('user:session:2');

//       //  get all value from the list  -- returns [ '0154f55c', 'bea73f4c', '999daa8f' ]
//       // const test = await this.cacheManagerService
//       //   .getClient()
//       //   .lRange('user:session:2', 0, -1);

//       // lRem will remove elements from the list that match sessionId
//      // The 0 means remove all occurrences of sessionId  , +ve value means remove n occurance from start of the list and -ve value means remove n ocuurence from the end of the list
//      await this.client.lRem(sessionKey, 0, sessionId);

//        */
//   }

//   getClient(): RedisClientType {
//     return this.client;
//   }

//   async onModuleDestroy() {
//     await this.client.disconnect();
//     console.log('Redis client disconnected');
//   }
// }

// /**
//  *
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJkaWxsaXJhanRpbWFsc2luYTM1NEBnbWFpbC5jb20iLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iLCJlbGl0ZSJdLCJmaXJzdE5hbWUiOiJEaWxsaSBSYWoiLCJtaWRkbGVOYW1lIjpudWxsLCJsYXN0TmFtZSI6IlRpbWFsc2luYSIsInByZW1pdW1FeHBpcnkiOiIyMDI0LTEwLTE3VDAwOjAwOjAwLjAwMFoiLCJzZXNzaW9uX2lkIjoiYTI0ZDVjZTkiLCJpYXQiOjE3Mjc5NDA1MzAsImV4cCI6MTcyODU0NTMzMH0.erhpXNuxZbZUAvAgUX5xPSZ0QECkkvLuXkuOeq4N0eo

//  */
