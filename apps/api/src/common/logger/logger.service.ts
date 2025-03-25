import { ConsoleLogger } from '@nestjs/common';

/**
 * Rather than writing a logger from scratch, you may be able to meet your needs by extending the built-in ConsoleLogger class and overriding selected behavior of the default implementation.
 */
export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.error(message, stack, context);
  }
}
