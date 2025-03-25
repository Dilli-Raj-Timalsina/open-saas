import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('blog')
  @HealthCheck()
  checkBlog() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'nepsetrading-api-blog',
          'https://api.nepsetrading.com/blog/perform-operations',
        ),
    ]);
  }

  @Get('db')
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
