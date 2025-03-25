import { MailerService } from '@nestjs-modules/mailer';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(
    data: { email: string; firstName: string },
    token: string,
  ) {
    const url = `${
      process.env.NODE_ENV == 'development'
        ? process.env.FRONTEND_URL_DEV
        : process.env.FRONTEND_URL_PROD
    }/confirm?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: data.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Stock Trading Site ! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          //  filling curly brackets with content
          name: data.firstName,
          url,
        },
      });
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async sendForgotPasswordOtp(email: string, firstName: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Stock Trading Site ! Verify your OTP ',
        template: './forgot-password',
        context: {
          name: firstName,
          otp: otp,
        },
      });
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async sendOffersEmail(
    email: string,
    fullname: string,
    title: string,
    date: string,
    location: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'NepseTrading, Training confimation Email !',
        template: './offers',
        context: {
          date: date,
          email: email,
          fullname: fullname,
          title: title,
          location: location,
        },
      });
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async sendProductPurchaseEmail(email: string, name: string, product: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'NepseTrading, Purchase Confirmation !',
        template: './product_purchase',
        context: {
          email: email,
          name: name,
          product: product,
        },
      });
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }
}
