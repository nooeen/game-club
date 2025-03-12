import { NestFactory } from '@nestjs/core';
import { CONFIG_DEFAULT } from '@app/share';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    cors: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  app.enable("trust proxy");
  app.disable("x-powered-by");
  app.disable("view cache");
  
  const port = configService.get('PORT') ?? CONFIG_DEFAULT.PORT;
  await app.listen(port);
  console.log(`---------- API_PORT: ${port} ----------`);
}
bootstrap();
