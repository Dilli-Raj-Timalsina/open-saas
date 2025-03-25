import { Module } from '@nestjs/common';
import { LoggingService } from './services/example2.service';
import { ConfigurableModuleClass } from './example2.module-defination';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule extends ConfigurableModuleClass {}

/**
 * You can now import and configure LoggingModule in the root module (or any other module) as needed.
 */
/**
// src/app.module.ts
import { Module } from '@nestjs/common';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    LoggingModule.forRoot({
      level: 'debug',  // Set desired logging level
    }),
  ],
})
export class AppModule {}
 */
