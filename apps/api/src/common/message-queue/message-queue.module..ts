import { Module } from '@nestjs/common';
import { EmailQueueConsumer } from './consumers/emailSender.service';
import { BullModule } from '@nestjs/bullmq';
// import { TestProducerService } from './producers/test-producer.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'email-queue',
    }),
  ],
  providers: [EmailQueueConsumer],
  exports: [],
})
export class MessageQueueModule {}
