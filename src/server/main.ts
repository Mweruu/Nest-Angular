import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Item API')
      .setDescription('My Item API')
      .build(),
  );

  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
