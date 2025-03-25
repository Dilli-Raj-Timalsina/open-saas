import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Yup from 'yup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentModule } from './concepts/experiment/experiment.module';
import databaseConfig from './config/database.config';
import { DataSourceOptions } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';

const NODE_ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      // load: [configuration],
      expandVariables: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('QUEUE_HOST'),
          port: configService.get('QUEUE_PORT'),
          password: configService.get('PROD_REDIS_PASSWORD'),
        },
      }),

      inject: [ConfigService],
    }),

    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   isGlobal: true,
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore,
    //     ...(configService.get('NODE_ENV') == 'production'
    //       ? configService.get('PROD_REDIS')
    //       : configService.get('DEV_REDIS')),
    //   }),
    //   inject: [ConfigService],
    // }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: Number(configService.get('THROTTLE_TTL')), // time to live in milisecond , 1000 milisecond = 1 second
          limit: Number(configService.get('THROTTLE_LIMIT')), // no of req limit per ttl
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${NODE_ENV}`],
      validationSchema: Yup.object({
        DB_HOST: Yup.string().required(),
        DB_PORT: Yup.number().default(5432),
        DB_USERNAME: Yup.string().required(),
        DB_PASSWORD: Yup.string().required(),
        DB_DATABASE: Yup.string().required(),
      }),
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return databaseConfig() as DataSourceOptions;
      },
    }),
    ExperimentModule,
    UserModule, //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
