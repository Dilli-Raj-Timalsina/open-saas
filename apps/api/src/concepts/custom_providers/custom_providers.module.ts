import { Module } from '@nestjs/common';
import { CustomProviderController } from './controllers/custom_providers.controller';
import { ValueProviderExampleService } from './services/usevalue.service';
import {
  MockPaymentService,
  StripePaymentService,
} from './services/useclass.service';
import { ConfigService, LoggerService } from './services/usefactory.service';

@Module({
  providers: [
    // value providers
    ValueProviderExampleService,
    {
      provide: 'DATABASE_CONFIG', // custom token
      useValue: 'DATABASE_CONFIG', // using the value from the config file
    },
    // class providers
    {
      provide: 'PaymentService',
      useClass:
        process.env.NODE_ENV == 'dev'
          ? MockPaymentService
          : StripePaymentService,
    },
    // factory providers
    ConfigService,
    LoggerService,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (
        configService: ConfigService,
        loggerService?: LoggerService,
      ) => {
        const config = configService.getDatabaseConfig();
        const connection = `Connected to ${config.database} at ${config.host}:${config.port}`;
        if (loggerService)
          loggerService.log(`Database connection established: ${connection}`);
        return connection;
      },
      inject: [ConfigService, { token: LoggerService, optional: true }],
    },
  ],
  controllers: [CustomProviderController],
})
export class CustomProviderModule {}
