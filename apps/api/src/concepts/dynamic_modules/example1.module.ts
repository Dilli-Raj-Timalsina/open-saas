import { DynamicModule, Module } from '@nestjs/common';
import { ExampleConfigService } from './services/example1.service';

@Module({
  providers: [],
  controllers: [],
})
export class SimpleDynamicConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: SimpleDynamicConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ExampleConfigService,
      ],
      exports: [ExampleConfigService],
    };
  }
}
