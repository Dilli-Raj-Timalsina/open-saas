/***
 The useFactory syntax allows for creating providers dynamically. The actual provider will be supplied by the value returned from a factory function. The factory function can be as simple or complex as needed. A simple factory may not depend on any other providers. A more complex factory can itself inject other providers it needs to compute its result. For the latter case, the factory provider syntax has a pair of related mechanisms:

1. The factory function can accept (optional) arguments.
2. The (optional) inject property accepts an array of providers that Nest will resolve and pass as arguments to the factory function during the instantiation process. Also, these providers can be marked as optional. The two lists should be correlated: Nest will pass instances from the inject list as arguments to the factory function in the same order. The example below demonstrates this.
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getDatabaseConfig() {
    return {
      host: 'localhost',
      port: 5432,
      username: 'db_user',
      password: 'db_password',
      database: 'my_database',
    };
  }
}

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LoggerService]: ${message}`);
  }
}
