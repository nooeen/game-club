import { NestFactory } from '@nestjs/core';
import { CONFIG_DEFAULT, PATHS } from '@app/share';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Game Club API')
    .setDescription('The Game Club API description')
    .setVersion('1.0')
    .addTag('Game Club')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(PATHS.SWAGGER, app, documentFactory);

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
