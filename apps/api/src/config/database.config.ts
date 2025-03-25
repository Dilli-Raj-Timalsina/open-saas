import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('database', () => {
  return {
    type: process.env.DB_TYPE as 'postgres' | 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    migrationsTransactionMode: 'each',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    logging: false,
    synchronize: false,
    migrationsRun: process.env.NODE_ENV === 'development',
    dropSchema: process.env.NODE_ENV === 'development',
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  } as DataSourceOptions;
});
