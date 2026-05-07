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

  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? [frontendUrl]
      : [frontendUrl, 'http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Buena Vida API')
    .setDescription('Sistema de pedidos mayoristas de vinos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ✅ Path completo, sin useGlobalPrefix
  SwaggerModule.setup('api/docs', app, document);

  await seed(app.get(DataSource));

  await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
  console.log(`🚀 App running on port ${process.env.PORT}`);
}
bootstrap();
