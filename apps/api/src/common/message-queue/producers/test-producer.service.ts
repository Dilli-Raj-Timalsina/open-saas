// import { InjectQueue } from '@nestjs/bullmq';
// import {
//   HttpException,
//   Injectable,
//   InternalServerErrorException,
//   OnModuleInit,
// } from '@nestjs/common';
// import { Queue } from 'bullmq';
// import { EMAIL_QUEUE_NAMES } from 'src/common/constants/email_types';

// @Injectable()
// export class TestProducerService implements OnModuleInit {
//   //inject this queue whereever you want to email of particualr type
//   constructor(@InjectQueue('email-queue') private emailQueue: Queue) {}

//   async onModuleInit() {
//     try {
//       //This will add a job to specified queue with name specified in first params,
//       await this.emailQueue.add(
//         EMAIL_QUEUE_NAMES.SIGNUP, // name of the job
//         {
//           //job data
//           email: 'dillirajtimalsina354@gmail.com',
//           firstName: 'Mahesh Babu',
//           token: 'jhsdkfhsklhsjkhflsdflhasl',
//         },
//         {
//           attempts: 2, // no of attempts if job fails
//           removeOnComplete: true, // it will not add any job in the complete or failed sets in redis
//         },
//       );

//       // this will return the count of jobs in certain state, click for more info
//       await this.emailQueue.getCompletedCount();
//       await this.emailQueue.getFailedCount();
//     } catch (err) {
//       throw err.status == undefined
//         ? new InternalServerErrorException(err)
//         : new HttpException(err, err.status);
//     }
//   }
// }
