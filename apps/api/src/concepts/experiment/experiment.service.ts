import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Experiment1 } from './experiment1.entity';

@Injectable()
export class ExperimentService {
  constructor() // private readonly experiment1Repository: Repository<Experiment1>,
  {}
  test1() {
    return 'test 1 successfull !';
  }

  test2() {
    return 'test 2 successful !';
  }

  async test3() {
    // return await this.experiment1Repository.find();
  }
}
