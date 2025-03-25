import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EMAIL_QUEUE_NAMES } from 'src/common/constants/email_types';
import { MyLogger } from 'src/common/logger/logger.service';
import { MailService } from 'src/mail/mail.service';

@Processor('email-queue')
export class EmailQueueConsumer extends WorkerHost {
  private readonly logger = new MyLogger();
  constructor(private mailService: MailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log(
      job.data,
      job.name,
      'job.data, job being processed !',
      'job.name, name of job e.g: signup,forgot-password',
    );
    switch (job.name) {
      case EMAIL_QUEUE_NAMES.SIGNUP: {
        const data = job.data as {
          email: string;
          firstName: string;
          token: string;
        };
        await this.mailService.sendUserConfirmation(
          {
            email: data.email,
            firstName: data.firstName,
          },
          data.token,
        );
        return {};
      }
      case EMAIL_QUEUE_NAMES.FORGOT_PASSWORD: {
        const data = job.data as {
          email: string;
          firstName: string;
          otp: string;
        };
        await this.mailService.sendForgotPasswordOtp(
          data.email,
          data.firstName,
          data.otp,
        );
        return {};
      }

      case EMAIL_QUEUE_NAMES.OFFERS: {
        const data = job.data as {
          email: string;
          fullname: string;
          title: string;
          date: string;
          location: string;
        };
        await this.mailService.sendOffersEmail(
          data.email,
          data.fullname,
          data.title,
          data.date,
          data.location,
        );
        return {};
      }

      case EMAIL_QUEUE_NAMES.PRODUCT_PURCHASE: {
        const data = job.data as {
          email: string;
          name: string;
          product: string;
        };
        await this.mailService.sendProductPurchaseEmail(
          data.email,
          data.name,
          data.product,
        );
        return {};
      }
    }

    return {};
  }

  //this is out the process method
  @OnWorkerEvent('error')
  onError(job: Job) {
    this.logger.warn(
      `Job with id ${job.id} and email ${job.data.email} errored, confirm if its valid error !!!`,
    );
  }
  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(job, 'job');
    this.logger.warn(
      `job with id ${job.id} and email ${job.data.email} failed, confirm if its valid failed !!! `,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `job with id ${job.id} and email ${job.data.email} completed !!`,
    );
  }
}
