import { Controller, Get, Inject } from '@nestjs/common';
import { ValueProviderExampleService } from '../services/usevalue.service';
import { PaymentService } from '../services/useclass.service';

@Controller('custom-provider')
export class CustomProviderController {
  constructor(
    private readonly valueProviderExampleService: ValueProviderExampleService,
    @Inject('PaymentService')
    private readonly classProviderExampleService: PaymentService,
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnections: string,
  ) {}

  @Get('use-value')
  useValue() {
    return this.valueProviderExampleService.getConnectionInfo();
  }

  @Get('use-class')
  useClass() {
    return this.classProviderExampleService.processPayment(12);
  }

  @Get('use-factory')
  useFactory() {
    return this.dbConnections;
  }
}
