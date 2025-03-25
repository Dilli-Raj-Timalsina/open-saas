import { Injectable, Inject } from '@nestjs/common';

/**
 The useValue syntax is useful for injecting a constant value, putting an external library into the Nest container, or replacing a real implementation with a mock object. 
 */

@Injectable()
export class ValueProviderExampleService {
  constructor(
    @Inject('DATABASE_CONFIG')
    private readonly config: typeof DATABASE_CONFIG,
  ) {}

  getConnectionInfo() {
    return `Connecting to ${this.config.host}:${this.config.port} as ${this.config.username}`;
  }
}

export const DATABASE_CONFIG = {
  host: 'localhost',
  port: 5432,
  username: 'test_user',
  password: 'test_password',
  database: 'test_db',
};
