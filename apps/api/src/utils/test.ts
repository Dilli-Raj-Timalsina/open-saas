import { ConfigModule } from '@nestjs/config';

export async function getStorageModule() {
  await ConfigModule.envVariablesLoaded;
  return process.env.STORAGE === 'S3' ? 'hello' : 'world';
}
