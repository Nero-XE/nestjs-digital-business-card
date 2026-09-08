import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? '0.0.0.0'

  await app.listen(port, host);
}
await bootstrap();
