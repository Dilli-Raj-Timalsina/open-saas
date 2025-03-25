// import {
//   Injectable,
//   OnModuleInit,
//   HttpException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { Client, Notification } from 'pg';
// import { RedisCacheService } from './redis-cache.service';

// @Injectable()
// export class DatabaseListenerService implements OnModuleInit {
//   private client_core: Client;

//   constructor(private readonly redisService: RedisCacheService) {
//     // this.client_core = new Client({
//     //   connectionString: process.env.DATABASE_URL_CORE,
//     // });
//   }

//   async onModuleInit() {
//     try {
//       //   this.initializeClientListen(this.client_core);
//     } catch (err) {
//       throw err.status == undefined
//         ? new InternalServerErrorException(err)
//         : new HttpException(err, err.status);
//     }
//   }

//   /**
//    * @param client : postgres database client , diffrent for diffrent databases .
//    * @description : It initializes a postgres client and start listening for cache_update channel in  db tables .
//    * @param msg : client.om ClientBase.on(event: "notification", listener: (message: Notification)
//    * whenever a trigger in db pushes notification on cache_update channel it runs an async method which accepts a meta information about the table as an argument of type Notification(imported from pg lybrary ) .
//    * @method client_on_asyc : It extracts the tableName from the msg body and clears the redis with keys matching the tablename prefixes .

//    */
//   async initializeClientListen(client: Client) {
//     await client.connect();
//     await client.query('LISTEN cache_update');

//     client.on('notification', async (msg: Notification) => {
//       console.log('Trigger function called on update ....');
//       console.log('Table Name : ', msg.payload.split(',')[1]);
//       //   console.log('Table Key : ', tableKey(msg.payload.split(',')[1]));
//       //   const tableName = tableKey(msg.payload.split(',')[1]);
//       //   await this.redisService.clearCacheWithPrefix(tableName);
//     });
//   }
// }
