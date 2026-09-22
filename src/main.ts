import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/interfaces/env.interface.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvironmentVariables>)
  app.useGlobalPipes(new ValidationPipe())

  const port = config.getOrThrow<number>('PORT')
  await app.listen(port);
}
await bootstrap();
