import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
Export custom provider
Like any provider, a custom provider is scoped to its declaring module. To make it visible to other modules, it must be exported. To export a custom provider, we can either use its token or the full provider object.

The following example shows exporting using the token:
 */

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: () => {
    return new ConfigService();
  },
  inject: [],
};

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
class ExportCustomProviderModule {}
