import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { seed } from './seed/seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ✅ Swagger PRIMERO, antes del seed y del listen
  const config = new DocumentBuilder()
    .setTitle('Buena Vida API')
    .setDescription('Sistema de pedidos mayoristas de vinos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
  });

  // ✅ Seed después
  await seed(app.get(DataSource));

  // ✅ Listen al final
  await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
  console.log(`🚀 App running on port ${process.env.PORT}`);
}
bootstrap();
