import { Module } from '@nestjs/common';
import { ExperimentController } from './experiment.controller';
import { ExperimentService } from './experiment.service';
import { Experiment1 } from './experiment1.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Experiment1])],
  controllers: [ExperimentController],
  providers: [ExperimentService],
})
export class ExperimentModule {}
