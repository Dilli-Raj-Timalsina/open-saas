import { Controller, Get } from '@nestjs/common';
import { ExperimentService } from './experiment.service';

@Controller('experiment')
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get('test1')
  test1() {
    return this.experimentService.test1();
  }

  @Get('test2')
  test2() {
    return this.experimentService.test2();
  }
}
